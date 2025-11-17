'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';

import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Stack,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DownloadIcon from '@mui/icons-material/Download';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import QRCodeBase from '@/components/QRCodeBase';
import CountdownTimer from '@/components/CountdownTimer';
import { useI18n } from '@/context/i18nContext';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setBuyInfo } from '@/lib/features/globalSlice';
import {
  LuCalendarDays,
  LuTimer,
  LuMapPin,
  LuTicket,
  LuPlus,
  LuMinus,
  LuHouse,
  LuArrowLeft,
  LuArrowRight,
} from 'react-icons/lu';

const InfoRow = ({ label, value }) => (
  <Grid container alignItems="center" sx={{ py: 0.75 }}>
    <Grid size={{ xs: 4, md: 3 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Grid>
    <Grid size={{ xs: 8, md: 9 }}>
      <Typography variant="body2" component="div" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Grid>
  </Grid>
);

export default function TicketSuccessPage() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const dateSessions = searchParams.get('date');
  const lang = pathname.split('/')[1] || 'en';
  const t = useI18n();

  const params = useParams();
  const id = params.id;
  const { buyInfo } = useAppSelector((state) => state.global);
  const { user } = useAppSelector((state) => state.global);

  const [qrCodeBase64, setQrCodeBase64] = useState('a');
  const [qrCodeMsg, setQrCodeMsg] = useState('s');
  const [time, setTime] = useState('');
  const [isReceive, setIsReceive] = useState(false);

  /* useEffect(() => {
    if (typeof window !== 'undefined' && (!buyInfo || buyInfo.ticketList.length === 0)) {
      const storedBuyInfo = sessionStorage.getItem('buyInfo');
      if (storedBuyInfo) {
        dispatch(setBuyInfo(JSON.parse(storedBuyInfo)));
      }
    }
  }, [dispatch]); */

  const grandTotal = buyInfo?.ticketList.reduce((sum, t) => sum + t.price, 0);
  const totalQty = buyInfo.ticketList.reduce((sum, t) => sum + t.qty, 0);
  const onReceiveClick = async () => {
    buyInfo?.ticketList.forEach(async (ticket) => {
      try {
        setIsReceive(true);
        const res = await fetch('/api/concert/sendVerifyCode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: buyInfo.orderId,
            email: ticket.email,
          }),
        });
        const data = await res.json();
        console.log('sendVerifyCode:', data.message);

        try {
          const vcRes = await fetch(`/api/concert/getVcQrcode?id=${data.message}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const vcData = await vcRes.json();
          console.log('getVcQrcode:', vcData);
          setQrCodeBase64(vcData.ticketVcDTOList[0].qrcode);
        } catch (error) {
          console.error('Error fetching QR Code:', error);
        }
      } catch (error) {
        console.error('Error sending verify code for ticket:', ticket, error);
      }
    });
  };
  console.log('buyInfo:', buyInfo);
  return (
    <>
      {isReceive ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}>
          {/* <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff4d4f' }}>
            ⛔ 交易失敗
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, maxWidth: 400, lineHeight: 1.6, color: 'white', textAlign: 'center' }}>
            您未在 5 分鐘內完成掃描，付款交易已失效。
          </Typography> */}

          <QRCodeBase qrCodeBase64={qrCodeBase64} />

          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={2}>
            <Button
              variant="contained"
              startIcon={<LuArrowLeft />}
              onClick={() => setIsReceive(true)}>
              上一張
            </Button>

            <Button
              variant="contained"
              startIcon={<LuArrowRight />}
              onClick={() => router.push('/')}>
              下一張
            </Button>
          </Stack> */}
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: (t) => (t.palette.mode === 'light' ? '#f5f7fb' : 'background.default'),
            py: { xs: 3, md: 6 },
          }}>
          <Container maxWidth="md">
            <Paper
              elevation={0}
              sx={{
                overflow: 'hidden',
                borderRadius: 3,
                mb: 3,
                border: (t) => `1px solid ${t.palette.divider}`,
              }}>
              <Box
                sx={{
                  px: { xs: 3, md: 6 },
                  py: { xs: 5, md: 6 },
                  background: 'linear-gradient(135deg, #6e62ff 0%, #8358ff 40%, #a34bff 100%)',
                  color: 'white',
                  textAlign: 'center',
                }}>
                <Stack spacing={2} alignItems="center">
                  <CheckCircleOutlineIcon sx={{ fontSize: 56 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    付款成功！
                  </Typography>
                  {/* <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      mt: 1,
                    }}>
                    您的票券已準備好！
                    <br />
                    請使用手機掃描下方的 QR Code，將票券加入您的數位錢包。
                    <br />
                  </Typography>

                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      mt: 1,
                    }}
                    variant="body">
                    ⚠️ 請於 5 分鐘內完成掃描，否則付款交易將失敗，票券無法生效。
                  </Typography> */}
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
                }}>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {buyInfo.concertInfo?.title}
                      </Typography>

                      {buyInfo.info?.map((item, index) =>
                        index === 0 ? null : (
                          <Stack direction="row" spacing={2} flexWrap="wrap" key={index}>
                            <Box
                              color="primary.main"
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {index === 1 && <LuCalendarDays size={20} />}
                              {index === 2 && <LuTimer size={20} />}
                              {index === 3 && <LuMapPin size={20} />}
                            </Box>

                            <Typography variant="body2">{item.value}</Typography>
                          </Stack>
                        ),
                      )}
                      <Typography variant="h6" gutterBottom>
                        訂單編號 : {buyInfo?.orderId}
                      </Typography>
                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={0.5}>
                        <Grid size={{ xs: 12 }}>
                          <Stack direction="row" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                            <Typography sx={{ width: '30%' }}>票種</Typography>
                            <Typography sx={{ width: '25%' }}>座位</Typography>
                            <Typography sx={{ width: '45%' }}>信箱</Typography>
                          </Stack>
                        </Grid>

                        {buyInfo.ticketList?.map((item, index) => (
                          <Grid size={{ xs: 12 }} key={index}>
                            <Stack direction="row" alignItems="center">
                              <Box sx={{ width: '30%' }}>
                                <Chip
                                  label={item.name}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              </Box>
                              <Typography
                                sx={{ width: '25%' }}
                                variant="overline"
                                color="text.secondary">
                                {item.line} 排 {item.seat} 號
                              </Typography>

                              <Typography
                                sx={{ width: '45%' }}
                                variant="overline"
                                color="text.secondary">
                                {item.email}
                              </Typography>
                            </Stack>
                          </Grid>
                        ))}
                        {/* <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="overline" color="text.secondary">
                            票種
                          </Typography>

                          {buyInfo.ticketList?.map((item, index) => (
                            <Stack
                              paddingBottom={1}
                              direction="row"
                              spacing={1}
                              alignItems="baseline"
                              key={index}>
                              <Chip
                                label={item.name}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                              <Typography variant="body2">
                                {item.seat ? `座位：${item.seat}` : '座位：無座位區'}
                              </Typography>
                            </Stack>
                          ))}
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Typography variant="overline" color="text.secondary">
                            票券數量
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {totalQty} 張
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Typography variant="overline" color="text.secondary">
                            總金額
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            NT$ {grandTotal.toLocaleString()}
                          </Typography>
                        </Grid> */}
                      </Grid>
                    </Grid>
                    {/* <Grid size={{ xs: 12, md: 4 }}>
                      <Box
                        sx={{
                          flex: 1,
                          p: 1,
                          position: 'relative',
                          display: 'inline-block',
                        }}>
                        <QRCodeBase qrCodeBase64={qrCodeBase64} />

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 2,
                          }}>
                          <CountdownTimer onTimeChange={setTime} />
                        </Box>
                      </Box>
                    </Grid> */}
                  </Grid>
                </CardContent>
              </Card>

              <Box sx={{ px: { xs: 3, md: 6 }, pb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  訂單詳情
                </Typography>
                <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
                  <InfoRow label="訂單編號" value={buyInfo?.orderId} />
                  <InfoRow
                    label="付款方式"
                    value={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CreditCardIcon fontSize="small" />
                        <span>信用卡（****{buyInfo?.cardLast}）</span>
                      </Stack>
                    }
                  />
                  <InfoRow label="付款時間" value={buyInfo?.payTime} />
                  <Divider sx={{ my: 1 }} />
                  <Grid container justifyContent={'space-between'}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        總計
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" textAlign="right" fontWeight={800}>
                        NT$ {grandTotal.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={2}>
                  <Button
                    variant="contained"
                    startIcon={<LuTicket />}
                    onClick={() => onReceiveClick()}>
                    領取票券
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<LuHouse />}
                    onClick={() => router.push('/')}>
                    稍後領取票券並回首頁
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Container>
        </Box>
      )}
    </>
  );
}
