import { Dialog, DialogContent, Typography, Box, Button, DialogActions } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import CountdownTimer from '@/components/CountdownTimer';

import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { useI18n } from '@/context/i18nContext';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setBuyInfo } from '@/lib/features/globalSlice';
import { useIsMobile } from '@/hook/useIsMobile';

export default function TicketQRCodeDialog({ dialogType, oriTicketList }) {
  const dispatch = useAppDispatch();
  const { buyInfo } = useAppSelector((state) => state.global);
  // const [currentNum, setCurrentNum] = useState(0);
  const isMobile = useIsMobile();
  const [time, setTime] = useState('');

  const [activeTicket, setActiveTicket] = useState(0);

  const [ticketVcList, setTicketVcList] = useState(oriTicketList);
  useEffect(() => {
    setTicketVcList(oriTicketList);
  }, [oriTicketList]);

  const handlePrev = () => setActiveTicket((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveTicket((prev) => Math.min(prev + 1, ticketVcList.length - 1));

  useEffect(() => {
    const allHasShelvesData = ticketVcList.every((item) => !!item.shelvesData);

    if (!allHasShelvesData) return; // ❌ 有缺 → 提前結束
    console.log('全部都有 shelvesData，可以進行後續動作');

    const interval = setInterval(async () => {
      try {
        const results = await Promise.all(
          ticketVcList.map(async (ticket) => {
            // 如果已經掃描過，就不再查 API
            if (ticket.isScanned) return ticket;
            console.log(ticket.vcStatusCode);
            const res = await fetch(`/api/trading/status?id=${ticket.shelvesData.tradeUuid}`);
            const data = await res.json();
            console.log('checkStatus data', data.message);
            return {
              ...ticket,
              isScanned: data.message === '票券販售中',
            };
          })
        );

        setTicketVcList(results);
      } catch (err) {
        console.error('票券檢查失敗', err);
      }
    }, 5000); // 每 5 秒檢查一次，可以調整

    return () => clearInterval(interval); // 組件卸載時清除計時器
  }, [ticketVcList]);
  console.log('ticketVcList', ticketVcList);

  /* useEffect(() => {
    if (!Array.isArray(oriTicketList) || oriTicketList.length === 0) return;
    setTicketVcList(oriTicketList);
  }, [oriTicketList, isMobile]); */
  console.log('ticketVcList', ticketVcList[activeTicket]);
  return isMobile ? (
    <>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant='h6' fontWeight={700} sx={{ mb: 1 }}>
          您的憑證已準備好！
        </Typography>

        <Typography variant='body2' sx={{ color: '#555', mb: 1 }}>
          請點選連接將憑證加入數位憑證皮夾 App，完成綁定
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: time === '00:00' ? '#fff1f0' : '#fff8e1',
            color: time === '00:00' ? '#ff4d4f' : '#b26a00',
            borderRadius: 2,
            p: 1,
            mb: 2,
          }}
        >
          {time === '00:00' ? <ErrorIcon sx={{ mr: 1 }} /> : <WarningAmberIcon sx={{ mr: 1 }} />}
          <Typography variant='body2' fontWeight={600}>
            {time === '00:00'
              ? '您未在 5 分鐘內完成綁定，連結已失效。'
              : '請於 5 分鐘內完成綁定，否則連結將失效。'}
          </Typography>
        </Box>

        <CountdownTimer onTimeChange={setTime}></CountdownTimer>

        <Box
          width={'100%'}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              position: 'relative',
              width: 160,
              height: 160,
            }}
          >
            {dialogType === 'shelves' && (
              <Button
                variant='contained'
                color='primary'
                disabled={!ticketVcList[activeTicket]?.shelvesData?.authUri}
                onClick={() => {
                  const authUri = ticketVcList[activeTicket]?.shelvesData?.authUri;
                  if (authUri) {
                    window.location.href = authUri;
                  }
                }}
              >
                加入數位憑證皮夾 App
              </Button>
            )}

            {dialogType === 'cancel' && (
              <Button
                variant='contained'
                color='primary'
                disabled={!ticketVcList[activeTicket]?.cancelData?.authUri}
                onClick={() => {
                  const authUri = ticketVcList[activeTicket]?.cancelData?.authUri;
                  if (authUri) {
                    window.location.href = authUri;
                  }
                }}
              >
                加入數位憑證皮夾 App
              </Button>
            )}

            {ticketVcList[activeTicket]?.isScanned && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: '5px solid #d32f2f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(-15deg)',
                    opacity: 0.9,
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{
                      color: '#d32f2f',
                      fontWeight: 700,
                      letterSpacing: 2,
                    }}
                  >
                    已加入數位憑證皮夾
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mt: 1,
          }}
        ></Box>
      </DialogContent>
    </>
  ) : (
    <>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant='h6' fontWeight={700} sx={{ mb: 1 }}>
          您的憑證已準備好！
        </Typography>

        <Typography variant='body2' sx={{ color: '#555', mb: 1 }}>
          請使用數位憑證皮夾 App 掃描 QR Code 完成上架票券
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#fff8e1',
            color: '#b26a00',
            borderRadius: 2,
            p: 1,
            mb: 2,
          }}
        >
          <WarningAmberIcon sx={{ mr: 1 }} />
          <Typography variant='body2' fontWeight={600}>
            請於 5 分鐘內完成掃描，否則 QR Code 將失效
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <img
            src={ticketVcList[activeTicket]?.shelvesData?.qrcodeImage}
            alt='QR Code'
            style={{
              width: 160,
              height: 160,
              borderRadius: 12,
              border: '1px solid #eee',
            }}
          />

          {ticketVcList[activeTicket]?.isScanned && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '5px solid #d32f2f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-15deg)',
                  opacity: 0.9,
                }}
              >
                <Typography
                  variant='h6'
                  sx={{
                    color: '#d32f2f',
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}
                >
                  已掃描
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mt: 1,
          }}
        ></Box>
      </DialogContent>
    </>
  );
}
