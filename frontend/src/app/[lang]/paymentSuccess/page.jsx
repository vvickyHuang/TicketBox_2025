'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Stack,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useI18n } from '@/context/i18nContext';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import TestQR from '@/components/TestQR';
import BubbleTour from '@/components/Tour/BubbleTour';
import {
  LuCalendarDays,
  LuTimer,
  LuMapPin,
  LuTicket,
  LuHouse,
  LuCopy,
  LuCopyCheck,
} from 'react-icons/lu';
import { useIsMobile } from '@/hook/useIsMobile';

const InfoRow = ({ label, value }) => (
  <Grid container alignItems='center' sx={{ py: 0.75 }}>
    <Grid size={{ xs: 4, md: 3 }}>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
    </Grid>
    <Grid size={{ xs: 8, md: 9 }}>
      <Typography variant='body2' component='div' sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Grid>
  </Grid>
);

export default function TicketSuccessPage() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const router = useRouter();
  const lang = pathname.split('/')[1] || 'en';
  const t = useI18n();
  const params = useParams();
  const { buyInfo } = useAppSelector((state) => state.global);
  const [tourOpen, setTourOpen] = useState(false);
  const [ticketVcList, setTicketVcList] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [steps, setSteps] = useState([]);

  const grandTotal = buyInfo?.ticketList.reduce((sum, t) => sum + t.price, 0);
  const totalQty = buyInfo.ticketList.reduce((sum, t) => sum + t.qty, 0);

  // --- 1️⃣ 送驗證碼，回傳 message ---
  const sendVerifyCode = async (orderId, email) => {
    const res = await fetch('/api/concert/sendVerifyCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, email }),
    });
    const data = await res.json();
    console.log('sendVerifyCode:', data.message);
    return data.message;
  };

  // --- 2️⃣ 取得 QR Code ---
  const getVcQrcode = async (id) => {
    const res = await fetch(`/api/concert/getVcQrcode?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log('getVcQrcode:', data);
    return data.ticketVcDTOList || [];
  };

  // --- 3️⃣ 處理全部 email ---
  const processAllEmails = async (orderId, ticketList) => {
    const uniqueEmails = Array.from(new Set(ticketList.map((t) => t.email)));

    const allVcResults = [];
    for (const email of uniqueEmails) {
      try {
        const message = await sendVerifyCode(orderId, email);
        const vcList = await getVcQrcode(message);
        console.log(buyInfo.ticketList);
        console.log('vcList:', vcList);

        const result = vcList.map((bItem) => {
          const matched = buyInfo.ticketList.find(
            (aItem) =>
              aItem.area === bItem.areaKey &&
              aItem.line.toString() === bItem.line.toString() &&
              aItem.seat.toString() === bItem.seat.toString()
          );
          console.log('matched:', matched);
          return {
            ...bItem,
            name: matched ? matched.user : null, // 沒找到就給 null 或保持不動
          };
        });

        console.log('合併後的結果:', result);

        allVcResults.push(...result); // 合併結果
      } catch (error) {
        console.error(`Error processing email ${email}:`, error);
      }
    }
    return allVcResults;
  };

  // --- 4️⃣ onReceiveClick ---
  const onReceiveClick = async () => {
    if (!buyInfo?.ticketList) return;
    console.log(isMobile);
    if (isMobile) {
      setSteps([
        {
          target: '#ticketQRCode',
          title: '加入數位憑證皮夾 App',
          text: '點擊即可將此票券加入您的數位票券錢包，方便隨時出示。oo',
          position: 'top',
        },
        {
          target: '#navNext',
          title: '下一張票',
          text: '若您的訂單有多張票，可從這裡切換依序加入皮夾。',
          position: 'top',
        },
      ]);
    } else {
      setSteps([
        {
          target: '#ticketQRCodePC',
          title: '加入數位憑證皮夾 App',
          text: '請使用數位憑證皮夾 App 掃描 QR Code 完成綁定',
          position: 'top',
        },
        {
          target: '#navNext',
          title: '下一張票',
          text: '若您的訂單有多張票，可從這裡切換依序加入皮夾。',
          position: 'top',
        },
      ]);
    }
    setDialogIsOpen(true);

    try {
      const allVcList = await processAllEmails(buyInfo.orderId, buyInfo.ticketList);
      setTicketVcList(allVcList);
    } catch (error) {
      console.error('Error processing tickets:', error);
    }
  };

  const handleCopy = () => {
    const text = buyInfo?.orderId;
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => setCopied(true))
        .catch(() => alert('複製失敗，請手動複製'));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch {
        alert('複製失敗，請手動複製');
      }
      document.body.removeChild(textarea);
    }

    // 1.5 秒自動恢復圖示
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Dialog
        disableEnforceFocus={false}
        open={dialogIsOpen}
        maxWidth='xs'
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <TestQR oriTicketList={ticketVcList} />

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            variant='outlined'
            color='secondary'
            sx={{ ml: 2 }}
            onClick={() => setTourOpen(true)}
          >
            教學說明
          </Button>
          <Button onClick={() => setDialogIsOpen(false)}>關閉</Button>
        </DialogActions>

        <BubbleTour open={tourOpen} steps={steps} onClose={() => setTourOpen(false)} />

        {/* <button onClick={() => setTourOpen(true)}>啟動教學</button> */}
      </Dialog>

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: (t) => (t.palette.mode === 'light' ? '#f5f7fb' : 'background.default'),
          py: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth='md'>
          <Paper
            elevation={0}
            sx={{
              overflow: 'hidden',
              borderRadius: 3,
              mb: 3,
              border: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Box
              sx={{
                px: { xs: 3, md: 6 },
                py: { xs: 5, md: 6 },
                background: 'linear-gradient(135deg, #6e62ff 0%, #8358ff 40%, #a34bff 100%)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Stack spacing={2} alignItems='center'>
                <CheckCircleOutlineIcon sx={{ fontSize: 56 }} />
                <Typography variant='h5' sx={{ fontWeight: 800 }}>
                  付款成功！
                </Typography>
                <Typography variant='h6' gutterBottom>
                  訂單編號 : {buyInfo?.orderId}
                </Typography>
              </Stack>
            </Box>

            <Card
              elevation={0}
              sx={{
                mx: { xs: 2, md: 4 },
                my: 3,
                borderRadius: 2,
                border: (t) => `1px dashed ${t.palette.divider}`,
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? '#fafbff' : 'background.paper',
              }}
            >
              <CardContent>
                <Grid container alignItems='center'>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                      {buyInfo.concertInfo?.title}
                    </Typography>

                    {buyInfo.info?.map((item, index) =>
                      index === 0 ? null : (
                        <Stack direction='row' spacing={2} flexWrap='wrap' key={index}>
                          <Box
                            color='primary.main'
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {index === 1 && <LuCalendarDays size={20} />}
                            {index === 2 && <LuTimer size={20} />}
                            {index === 3 && <LuMapPin size={20} />}
                          </Box>

                          <Typography variant='body2'>{item.value}</Typography>
                        </Stack>
                      )
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={0.5}>
                      <Grid size={{ xs: 12 }}>
                        <Stack direction='row' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                          <Typography sx={{ width: '22%' }}>票種</Typography>
                          <Typography sx={{ width: '25%' }}>座位</Typography>
                          <Typography sx={{ width: '20%' }}>姓名</Typography>
                          <Typography sx={{ width: '33%' }}>信箱</Typography>
                        </Stack>
                      </Grid>

                      {buyInfo.ticketList?.map((item, index) => (
                        <Grid size={{ xs: 12 }} key={index}>
                          <Stack direction='row' alignItems='center'>
                            <Box sx={{ width: '22%' }}>
                              <Chip
                                label={item.name}
                                size='small'
                                color='primary'
                                variant='outlined'
                              />
                            </Box>
                            <Typography
                              sx={{ width: '25%' }}
                              variant='overline'
                              color='text.secondary'
                            >
                              {item.line} 排 {item.seat} 號
                            </Typography>

                            <Typography
                              sx={{ width: '20%' }}
                              variant='overline'
                              color='text.secondary'
                            >
                              {item.user}{' '}
                            </Typography>

                            <Typography
                              sx={{ width: '30%', textTransform: 'none' }}
                              variant='overline'
                              color='text.secondary'
                            >
                              {item.email}
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{ px: { xs: 3, md: 6 }, pb: 4 }}>
              <Typography variant='subtitle1' sx={{ fontWeight: 700, mb: 1 }}>
                訂單詳情
              </Typography>
              <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
                <InfoRow
                  label='訂單編號'
                  value={
                    <Stack
                      direction='row'
                      spacing={1}
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <span>{buyInfo.orderId}</span>{' '}
                      <Button
                        variant='outlined'
                        onClick={handleCopy}
                        sx={{
                          width: 40,
                          height: 40,
                          minWidth: 40,
                          padding: 1,
                        }}
                      >
                        {copied ? <LuCopyCheck size={20} /> : <LuCopy size={20} />}
                      </Button>
                    </Stack>
                  }
                />
                <InfoRow
                  label='付款方式'
                  value={
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <CreditCardIcon fontSize='small' />
                      <span>信用卡（****{buyInfo?.cardLast}）</span>
                    </Stack>
                  }
                />
                <InfoRow label='付款時間' value={buyInfo?.payTime} />
                <Divider sx={{ my: 1 }} />
                <Grid container justifyContent={'space-between'}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant='body2' color='text.secondary'>
                      總計
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant='body2' textAlign='right' fontWeight={800}>
                      NT$ {grandTotal.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={2}>
                <Button
                  variant='contained'
                  startIcon={<LuTicket />}
                  onClick={() => onReceiveClick()}
                >
                  領取票券
                </Button>

                <Button
                  variant='contained'
                  startIcon={<LuHouse />}
                  onClick={() => router.push('/tw/concert')}
                >
                  稍後領取票券並回首頁
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
