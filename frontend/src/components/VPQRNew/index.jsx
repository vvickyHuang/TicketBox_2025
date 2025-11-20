import { Dialog, DialogContent, Typography, Box, Button, Stack } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useEffect, useState } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { useI18n } from '@/context/i18nContext';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setTradingList, setBuyInfo } from '@/lib/features/globalSlice';
import { useIsMobile } from '@/hook/useIsMobile';
import CountdownTimer from '@/components/CountdownTimer';

export default function TicketQRCodeDialog({ dialogType, oriTicketList, handleSearch }) {
  const dispatch = useAppDispatch();
  const { buyInfo } = useAppSelector((state) => state.global);
  // const [currentNum, setCurrentNum] = useState(0);
  const isMobile = useIsMobile();

  const [time, setTime] = useState('');

  const [ticketVcList, setTicketVcList] = useState(oriTicketList);
  useEffect(() => {
    setTicketVcList(oriTicketList);
  }, [oriTicketList]);

  useEffect(() => {
    if (ticketVcList.vcStatus !== 'ACTIVE') return;
    const interval = setInterval(async () => {
      try {
        if (ticketVcList.isScanned) return;
        const res = await fetch(`/api/trading/status?id=${ticketVcList.tradeToken}`);
        const data = await res.json();
        console.log('checkStatus data', data.message);
        let obj = {
          id: Math.random().toString(36).slice(2, 7),
          title: 'BTS PERMISSION TO DANCE ON STAGE - TAIPEI',
          date: '2025/12/20(六) 19:30',
          location: '臺北大巨蛋',
          seat: `特${ticketVcList.area}區 第${ticketVcList.line}排 ${ticketVcList.seat}號 (1張)`,
          price: 6880,
          tags: ['售票', '特A區'],
          status: 'sell',
          seatImg: '/aiimg/btsseat.png',
          image: '/aiimg/btsbg.png',
          seller: {
            name: 'Mike Chen',
          },
          ticketList: [
            {
              areaKey: ticketVcList.area,
              email: '',
              line: ticketVcList.line,
              name: `特${ticketVcList.area}區`,
              price: 6880,
              seat: ticketVcList.seat,
              user: '',
              tradeToken: ticketVcList.tradeToken,
            },
          ],
        };
        dispatch(setTradingList(obj));
        dispatch(
          setBuyInfo({
            concertInfo: obj,
            ticketList: obj.ticketList,
          }),
        );
        setTicketVcList((prev) => ({
          ...prev,
          isScanned: data.message === '票券販售中',
        }));
        handleSearch();
      } catch (err) {
        console.error('票券檢查失敗', err);
      }
    }, 5000); // 每 5 秒檢查一次，可以調整

    return () => clearInterval(interval); // 組件卸載時清除計時器
  }, [ticketVcList]);

  useEffect(() => {
    if (ticketVcList.vcStatus !== 'TRADING') return;
    const interval2 = setInterval(async () => {
      try {
        if (ticketVcList.isScanned) return;
        const res = await fetch(`/api/trading/status?id=${ticketVcList.tradeToken}`);
        const data = await res.json();
        console.log('checkStatus data', data.message);
        setTicketVcList((prev) => ({
          ...prev,
          isScanned: data.message === '票券持有中',
        }));
        handleSearch();
      } catch (err) {
        console.error('票券檢查失敗', err);
      }
    }, 5000); // 每 5 秒檢查一次，可以調整

    return () => clearInterval(interval2); // 組件卸載時清除計時器
  }, [ticketVcList]);

  console.log('VPQRNEW', ticketVcList);
  return isMobile ? (
    <>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          您的憑證已準備好！
        </Typography>
        <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
          請點選連接將憑證加入數位憑證皮夾 App，
          {dialogType === 'cancel' && '取消票券販售'}
          {dialogType === 'shelves' && '完成票券上架'}
          {dialogType === 'get' && '完成票券綁定'}
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
          }}>
          {time === '00:00' ? <ErrorIcon sx={{ mr: 1 }} /> : <WarningAmberIcon sx={{ mr: 1 }} />}
          <Typography variant="body2" fontWeight={600}>
            {time === '00:00'
              ? '您未在 5 分鐘內完成綁定，連結已失效。'
              : '請於 5 分鐘內完成綁定，否則連結將失效。'}
          </Typography>
        </Box>

        {!ticketVcList.isScanned && <CountdownTimer onTimeChange={setTime}></CountdownTimer>}

        <Stack spacing={0.5} alignItems="center" textAlign="center">
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Typography variant="subtitle2" fontWeight={600}>
              區域：{ticketVcList?.area}
            </Typography>

            <Typography variant="subtitle2" fontWeight={600}>
              座位：{ticketVcList?.line}排{ticketVcList?.seat}號
            </Typography>
          </Stack>

          {/* 第二排：姓名（大字） */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ textTransform: 'none' }}>
            姓名：{ticketVcList?.name}
          </Typography>
        </Stack>
        <Box
          width={'100%'}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            position: 'relative',
          }}>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              position: 'relative',
              width: 160,
              height: 160,
            }}>
            <Button
              id="ticketQRCode"
              variant="contained"
              color="primary"
              disabled={!ticketVcList?.authUri}
              onClick={() => {
                const authUri = ticketVcList?.authUri;
                if (authUri) {
                  window.location.href = authUri;
                }
              }}>
              前往數位憑證皮夾 App 選擇
              {dialogType === 'cancel' && '欲取消的票券'}
              {dialogType === 'shelves' && '欲販售的票券'}
            </Button>
            {ticketVcList?.isScanned && (
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
                }}>
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
                  }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#d32f2f',
                      fontWeight: 700,
                      letterSpacing: 2,
                    }}>
                    {dialogType === 'cancel' && '取消販售此票券'}
                    {dialogType === 'shelves' && '選擇販售此票券'}
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
          }}></Box>
      </DialogContent>
    </>
  ) : (
    <>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          您的憑證已準備好！
        </Typography>

        <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
          請使用數位憑證皮夾 App 掃描 QR Code 完成販售我的票券
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
          }}>
          <WarningAmberIcon sx={{ mr: 1 }} />
          <Typography variant="body2" fontWeight={600}>
            請於 5 分鐘內完成掃描，否則 QR Code 將失效
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
          }}>
          <img
            src={ticketVcList?.qrcodeImage}
            alt="QR Code"
            style={{
              width: 160,
              height: 160,
              borderRadius: 12,
              border: '1px solid #eee',
            }}
          />

          {ticketVcList?.isScanned && (
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
              }}>
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
                }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#d32f2f',
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}>
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
          }}></Box>
      </DialogContent>
    </>
  );
}
