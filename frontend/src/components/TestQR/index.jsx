import { Dialog, DialogContent, Typography, Box, Button, IconButton } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect, useState } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { useIsMobile } from '@/hook/useIsMobile';
import CountdownTimer from '@/components/CountdownTimer';

export default function TicketQRCodeDialog({ oriTicketList }) {
  const isMobile = useIsMobile();

  const [activeTicket, setActiveTicket] = useState(0);
  const [time, setTime] = useState('');
  const [ticketVcList, setTicketVcList] = useState(oriTicketList);
  console.log('oriTicketList', oriTicketList);
  useEffect(() => {
    setTicketVcList(oriTicketList);
  }, [oriTicketList]);
  console.log('oriTicketList', ticketVcList);

  const handlePrev = () => setActiveTicket((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveTicket((prev) => Math.min(prev + 1, ticketVcList.length - 1));
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const results = await Promise.all(
          ticketVcList.map(async (ticket) => {
            // 如果已經掃描過，就不再查 API
            if (ticket.isScanned) return ticket;
            // console.log(ticket.vcBindToken);
            const res = await fetch(`/api/concert/checkStatus?id=${ticket.vcBindToken}`);
            const data = await res.json();
            console.log('checkStatus data', data.message);
            return {
              ...ticket,
              isScanned: data.message === 'VC 綁定完成',
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
  const [tourOpen, setTourOpen] = useState(false);

  return isMobile ? (
    <>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant='h6' fontWeight={700} sx={{ mb: 1 }}>
          您的票券已準備好！
        </Typography>

        <Typography variant='body2' sx={{ color: '#555', mb: 1 }}>
          請點選連接將票券加入數位憑證皮夾 App，完成綁定
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

        <Box sx={{ my: 2 }}>
          <Typography variant='subtitle2' fontWeight={600}>
            區域：{ticketVcList[activeTicket]?.area} 排數：{ticketVcList[activeTicket]?.line}{' '}
            排　座位：{ticketVcList[activeTicket]?.seat} 號
          </Typography>
        </Box>

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
            <Button
              id='ticketQRCode'
              variant='contained'
              color='primary'
              disabled={!ticketVcList[activeTicket]?.deeplink}
              onClick={() => {
                const authUri = ticketVcList[activeTicket]?.deeplink;
                if (authUri) {
                  window.location.href = authUri;
                }
              }}
            >
              加入數位憑證皮夾 App
            </Button>
            {/* <img
            src={ticketVcList[activeTicket]?.qrcode}
            alt="QR Code"
            style={{
              width: 160,
              height: 160,
              borderRadius: 12,
              border: '1px solid #eee',
            }}
          /> */}

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
            mt: 1,
          }}
        >
          <Button
            variant='contained'
            startIcon={<LuArrowLeft />}
            onClick={handlePrev}
            disabled={activeTicket === 0}
          >
            上一張
          </Button>

          <Typography variant='body2' sx={{ minWidth: 60, textAlign: 'center', color: '#555' }}>
            {ticketVcList.length > 0 ? `${activeTicket + 1} / ${ticketVcList.length}` : '- / -'}
          </Typography>

          <Button
            id='navNext'
            variant='contained'
            endIcon={<LuArrowRight />}
            onClick={handleNext}
            disabled={activeTicket === ticketVcList.length - 1 || ticketVcList.length === 0}
          >
            下一張
          </Button>
        </Box>
      </DialogContent>
    </>
  ) : (
    <>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant='h6' fontWeight={700} sx={{ mb: 1 }}>
          您的票券已準備好！
        </Typography>

        <Typography variant='body2' sx={{ color: '#555', mb: 1 }}>
          請使用數位憑證皮夾 App 掃描 QR Code 完成綁定
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

        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle2' fontWeight={600}>
            區域：{ticketVcList[activeTicket]?.area} 排數：{ticketVcList[activeTicket]?.line}{' '}
            排　座位：{ticketVcList[activeTicket]?.seat} 號
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <img
            src={ticketVcList[activeTicket]?.qrcode}
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
        >
          <Button
            variant='contained'
            startIcon={<LuArrowLeft />}
            onClick={handlePrev}
            disabled={activeTicket === 0}
          >
            上一張
          </Button>

          <Typography variant='body2' sx={{ minWidth: 60, textAlign: 'center', color: '#555' }}>
            {ticketVcList.length > 0 ? `${activeTicket + 1} / ${ticketVcList.length}` : '- / -'}
          </Typography>

          <Button
            variant='contained'
            endIcon={<LuArrowRight />}
            onClick={handleNext}
            disabled={activeTicket === ticketVcList.length - 1 || ticketVcList.length === 0}
          >
            下一張
          </Button>
        </Box>
      </DialogContent>
    </>
  );
}
