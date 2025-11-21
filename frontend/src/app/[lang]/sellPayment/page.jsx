'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { LuCalendarDays, LuTimer, LuMapPin, LuTicket, LuPlus, LuMinus } from 'react-icons/lu';
import { useIsMobile } from '@/hook/useIsMobile';
import { ExpandMore } from '@mui/icons-material';
import { addSnackbar } from '@/lib/features/snackbarSlice';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
  Stepper,
  Step,
  Paper,
  StepLabel,
  TextField,
  Skeleton,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import PaymetElement from '@/components/PaymetElement';
import LoadingPay from '@/components/LoadingPay';

import { useI18n } from '@/context/i18nContext';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setBuyInfo } from '@/lib/features/globalSlice';

export default function LoginPage() {
  const isMobile = useIsMobile();

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateSessions = searchParams.get('date');
  const lang = pathname.split('/')[1] || 'en';
  const t = useI18n();

  const { buyInfo } = useAppSelector((state) => state.global);
  const [currentBuyInfo, setCurrentBuyInfo] = useState({
    ticketList: [],
    concertInfo: {},
    info: [],
    cardLast: '',
    payTime: '',
    orderId: '',
  });

  const [loadingMap, setLoadingMap] = useState({ isLoadingInfo: true, isLoadingPay: false });
  const [card, setCard] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [paid, setPaid] = useState(false);
  const [globalEmail, setGlobalEmail] = useState('');

  const grandTotal = buyInfo?.ticketList.reduce((sum, t) => sum + t.price, 0);

  const handleSubmit = async () => {
    setLoadingMap((prev) => ({ ...prev, isLoadingPay: true }));
    console.log('Submitting payment with:', { card, expDate, cvc });
    console.log('Buy Info:', buyInfo);

    const tradeUuids = buyInfo.ticketList.map((item) => item?.vcBindToken).filter(Boolean); // 避免 undefined

    tradeUuids.forEach(async (uuid) => {
      try {
        const revokeRes = await fetch(`/api/trading/revokeVc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vcBindToken: uuid }),
        });

        const revokeData = await revokeRes.json();
        console.log('API 回傳', revokeData);
        /*  const res = await fetch(`/api/trading/status?id=${uuid}`);

        const data = await res.json();
        console.log('API 回傳', data);
        try {
          const revokeRes = await fetch(`/api/trading/revokeVc`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vcBindToken: data.VcBindToken }),
          });

          const revokeData = await revokeRes.json();
          console.log('API 回傳', revokeData);
        } catch (err) {
          console.error('API 錯誤', err);
        } */
      } catch (err) {
        console.error('API 錯誤', err);
      }
    });

    const ajaxData = buyInfo.ticketList.map((item) => ({
      concertId: buyInfo.concertInfo.id.toString(),
      area: item.areaKey,
      line: item.line.toString(),
      seat: item.seat.toString(),
      email: item.email,
      name: item.user,
    }));

    try {
      const res = await fetch('/api/concert/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketlist: ajaxData }),
      });

      const data = await res.json();
      setTimeout(() => {
        router.push(`/${lang}/paymentSuccess`);

        dispatch(
          addSnackbar({
            message: '票券購買成功，感謝您的購買',
            severity: 'success',
          }),
        );
      }, 2000);
      const cardLast = card.slice(-4);
      const payTime = dayjs().format('YYYY/MM/DD HH:mm:ss');
      const orderId = data.orderId;
      dispatch(
        setBuyInfo({
          cardLast,
          payTime,
          orderId,
        }),
      );
    } catch (err) {
      console.error('下單失敗', err);
    } finally {
    }
  };

  useEffect(() => {
    setLoadingMap((prev) => ({ ...prev, isLoadingInfo: false }));
  }, []);

  useEffect(() => {
    if (buyInfo) {
      sessionStorage.setItem('buyInfo', JSON.stringify(buyInfo));
    }
    const updatedTicketList = buyInfo.ticketList.map((ticket) => ({
      ...ticket,
      email: '',
      user: '',
    }));
    console.log(updatedTicketList);
    dispatch(
      setBuyInfo({
        ticketList: updatedTicketList,
      }),
    );
  }, []);

  const handleEmailChange = (index, value) => {
    const newTicketList = buyInfo.ticketList.map((item, i) =>
      i === index ? { ...item, email: value } : item,
    );

    dispatch(
      setBuyInfo({
        ...buyInfo,
        ticketList: newTicketList,
      }),
    );
  };

  const handleUserChange = (index, value) => {
    const newTicketList = buyInfo.ticketList.map((item, i) =>
      i === index ? { ...item, user: value } : item,
    );

    dispatch(
      setBuyInfo({
        ...buyInfo,
        ticketList: newTicketList,
      }),
    );
  };

  const formatCard = (v) =>
    v
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();

  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
  };

  return isMobile ? (
    <>
      {loadingMap.isLoadingInfo ? (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 3 }} />
        </Box>
      ) : (
        <>
          {loadingMap.isLoadingPay && <LoadingPay />}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'flex-start',
              p: 3,
              gap: 2,
              flexDirection: 'column',
            }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                boxShadow: 2,
                mb: 3,
              }}>
              <Box
                sx={{
                  borderRadius: '24px 24px 0 0',
                  width: '100%',
                  height: 120,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f3f3f3',
                }}>
                <CardMedia
                  component="img"
                  image={buyInfo?.concertInfo?.image}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
              <Box sx={{ m: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {buyInfo?.concertInfo?.title}
                </Typography>
                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                  {buyInfo?.info?.map((item, index) => (
                    <Grid
                      key={index}
                      sx={{
                        gap: 1,
                        minWidth: '150px',
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                      }}>
                      <Box
                        color="primary.main"
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {index === 0 && <LuTicket size={24} />}
                        {index === 1 && <LuCalendarDays size={24} />}
                        {index === 2 && <LuTimer size={24} />}
                        {index === 3 && <LuMapPin size={24} />}
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          my: 1,
                        }}>
                        {item.label}
                      </Typography>
                      <Typography gap={1}>
                        <strong>{item.value}</strong>
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ width: '100%' }}>
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      訂單明細
                    </Typography>

                    <Grid container spacing={1} sx={{ flexDirection: 'column' }}>
                      {buyInfo?.ticketList.map(
                        (item, index) =>
                          item.qty > 0 && (
                            <Grid
                              key={index}
                              sx={{
                                backgroundColor: '#F9F7FF',
                                borderRadius: 3,
                                px: 2,
                                py: 1,
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: 'space-between',
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(90,62,186,0.15)',
                              }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: { xs: '100%', sm: 'auto' },
                                }}>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="600"
                                  sx={{ mb: { xs: 0.5, sm: 0 } }}>
                                  {item.name}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: { xs: 'space-between', sm: 'flex-end' },
                                  width: { xs: '100%', sm: '300px' }, // 手機撐滿、桌面固定寬
                                  mt: { xs: 1, sm: 0 },
                                }}>
                                <Typography>
                                  {item.line} 排 {item.seat} 號
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                  NT$ {item.price.toLocaleString()}
                                </Typography>
                              </Box>
                            </Grid>
                          ),
                      )}
                    </Grid>

                    <Grid
                      size={{ xs: 12 }}
                      sx={{
                        p: 2,
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Typography fontWeight="600">總金額</Typography>
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        NT$ {grandTotal?.toLocaleString()}
                      </Typography>
                    </Grid>
                  </>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: '100%' }}>
              <Card
                elevation={0}
                sx={{
                  width: { xs: '100%', sm: '70%' },
                  borderRadius: 2,
                  border: (t) => `1px dashed ${t.palette.divider}`,
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? '#fafbff' : 'background.paper',
                }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    輸入訂單資訊
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* 全域信箱 */}
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="全域信箱（套用所有票）"
                      value={globalEmail}
                      onChange={(e) => {
                        const value = e.target.value;
                        setGlobalEmail(value);

                        const newTicketList = buyInfo.ticketList.map((item) => ({
                          ...item,
                          email: value,
                        }));

                        dispatch(
                          setBuyInfo({
                            ...buyInfo,
                            ticketList: newTicketList,
                          }),
                        );
                      }}
                    />
                  </Box>

                  {buyInfo.ticketList?.map((item, index) => (
                    <Accordion key={index} sx={{ mb: 2 }} defaultExpanded>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography fontWeight="bold">
                          {item.name} - {item.line}排{item.seat}號
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={1}>
                          <TextField
                            fullWidth
                            size="small"
                            label="姓名"
                            value={item.user}
                            onChange={(e) => handleUserChange(index, e.target.value)}
                          />
                          <TextField
                            fullWidth
                            size="small"
                            label="信箱"
                            value={item.email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                          />
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
              <Card
                elevation={0}
                sx={{
                  width: { xs: '100%', sm: '30%' },
                  borderRadius: 2,
                  border: (t) => `1px dashed ${t.palette.divider}`,
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? '#fafbff' : 'background.paper',
                }}>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid size={{ xs: 12 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2, width: '100%' }}>
                          輸入付款資訊
                        </Typography>

                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                          }}
                          onClick={() => {
                            setCard(formatCard('1212121212121212'));
                            setExpDate(formatExpiry('11/24'));
                            setCvc('345');
                          }}>
                          填入測試付款資訊
                        </Button>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <PaymetElement
                        card={card}
                        setCard={setCard}
                        expDate={expDate}
                        setExpDate={setExpDate}
                        cvc={cvc}
                        setCvc={setCvc}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
              }}
              onClick={handleSubmit}>
              付款
            </Button>
          </Box>
        </>
      )}
    </>
  ) : (
    <>
      {loadingMap.isLoadingInfo ? (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 3 }} />
        </Box>
      ) : (
        <>
          {loadingMap.isLoadingPay && <LoadingPay />}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'flex-start',
              p: 3,
              gap: 2,
              flexDirection: 'column',
            }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                boxShadow: 2,
                mb: 3,
              }}>
              <Box
                sx={{
                  borderRadius: '24px 24px 0 0',
                  width: '100%',
                  height: 400,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f3f3f3',
                }}>
                <CardMedia
                  component="img"
                  image={buyInfo?.concertInfo?.image}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
              <Box sx={{ m: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {buyInfo?.concertInfo?.title}
                </Typography>
                <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                  {buyInfo?.info?.map((item, index) => (
                    <Grid
                      key={index}
                      sx={{
                        gap: 1,
                        minWidth: '150px',
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                      }}>
                      <Box
                        color="primary.main"
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {index === 0 && <LuTicket size={24} />}
                        {index === 1 && <LuCalendarDays size={24} />}
                        {index === 2 && <LuTimer size={24} />}
                        {index === 3 && <LuMapPin size={24} />}
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          my: 1,
                        }}>
                        {item.label}
                      </Typography>
                      <Typography gap={1}>
                        <strong>{item.value}</strong>
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ width: '100%' }}>
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={1} sx={{ width: '100%', flexDirection: 'column' }}>
                      <Grid sx={{ display: 'flex', gap: 1, height: '32px' }}>
                        <Grid size={{ xs: 4 }} sx={{ width: '40%', px: 2 }}>
                          <Typography variant="body1" fontWeight="bold">
                            票種
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 4 }} sx={{ width: '35%' }}>
                          <Typography variant="body1" fontWeight="bold">
                            座位
                          </Typography>
                        </Grid>
                        <Grid
                          size={{ xs: 4 }}
                          sx={{ width: '15%', display: 'flex', justifyContent: 'flex-end', px: 2 }}>
                          <Typography variant="body1" fontWeight="bold">
                            票價
                          </Typography>
                        </Grid>
                      </Grid>

                      {buyInfo?.ticketList.map((item, index) => (
                        <Grid
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: 1,
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            px: 2,
                            alignItems: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            border: '1px solid rgba(90,62,186,0.15)',
                            height: '48px',
                          }}>
                          <Grid size={{ xs: 4 }} sx={{ width: '40%' }}>
                            <Typography>{item.name}</Typography>
                          </Grid>
                          <Grid size={{ xs: 4 }} sx={{ width: '35%' }}>
                            <Typography>
                              {item.line} 排 {item.seat} 號
                            </Typography>
                          </Grid>
                          <Grid
                            size={{ xs: 4 }}
                            sx={{
                              width: '15%',
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}>
                            <Typography variant="h6" fontWeight="bold">
                              NT$ {item.price.toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid sx={{ display: 'flex', gap: 1, height: '32px', mt: 1 }}>
                        <Grid size={{ xs: 4 }} sx={{ width: '40%', px: 2 }}>
                          <Typography variant="body1" fontWeight="bold">
                            總金額
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 4 }} sx={{ width: '35%' }}>
                          <Typography variant="body1" fontWeight="bold"></Typography>
                        </Grid>
                        <Grid
                          size={{ xs: 4 }}
                          sx={{ width: '15%', display: 'flex', justifyContent: 'flex-end', px: 2 }}>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            NT$ {grandTotal?.toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
              <Card
                elevation={0}
                sx={{
                  width: { xs: '100%', sm: '70%' },
                  borderRadius: 2,
                  border: (t) => `1px dashed ${t.palette.divider}`,
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? '#fafbff' : 'background.paper',
                }}>
                <CardContent>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                      輸入訂單資訊
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 1 }}>
                        <Box sx={{ width: '15%' }}></Box>
                        <Box sx={{ width: '15%' }}></Box>
                        <Box sx={{ width: '20%' }}></Box>
                        <TextField
                          sx={{ width: '48%' }}
                          size="small"
                          label="全域信箱（套用所有票）"
                          value={globalEmail}
                          onChange={(e) => {
                            const value = e.target.value;
                            setGlobalEmail(value);

                            const newTicketList = buyInfo.ticketList.map((item) => ({
                              ...item,
                              email: value,
                            }));

                            dispatch(
                              setBuyInfo({
                                ...buyInfo,
                                ticketList: newTicketList,
                              }),
                            );
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Stack
                          direction="row"
                          sx={{ fontWeight: 600, color: 'text.secondary', gap: 1 }}>
                          <Typography sx={{ width: '15%' }}>票種</Typography>
                          <Typography sx={{ width: '15%' }}>座位</Typography>
                          <Typography sx={{ width: '20%' }}>姓名</Typography>
                          <Typography sx={{ width: '48%' }}>信箱</Typography>
                        </Stack>
                      </Grid>

                      {buyInfo.ticketList?.map((item, index) => (
                        <Grid size={{ xs: 12 }} key={index}>
                          <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
                            <Box sx={{ width: '15%' }}>
                              <Chip
                                label={item.name}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                            <Typography sx={{ width: '15%' }}>
                              {item.line} 排 {item.seat} 號
                            </Typography>

                            <TextField
                              sx={{ width: '20%' }}
                              size="small"
                              label="姓名"
                              value={item.user}
                              onChange={(e) => handleUserChange(index, e.target.value)}
                            />

                            <TextField
                              sx={{ width: '48%' }}
                              size="small"
                              label="信箱"
                              value={item.email}
                              onChange={(e) => handleEmailChange(index, e.target.value)}
                            />
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card
                elevation={0}
                sx={{
                  width: { xs: '100%', sm: '30%' },
                  borderRadius: 2,
                  border: (t) => `1px dashed ${t.palette.divider}`,
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? '#fafbff' : 'background.paper',
                }}>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid size={{ xs: 12 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2, width: '100%' }}>
                          輸入付款資訊
                        </Typography>

                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                          }}
                          onClick={() => {
                            setCard(formatCard('1212121212121212'));
                            setExpDate(formatExpiry('11/24'));
                            setCvc('345');
                          }}>
                          填入測試付款資訊
                        </Button>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <PaymetElement
                        card={card}
                        setCard={setCard}
                        expDate={expDate}
                        setExpDate={setExpDate}
                        cvc={cvc}
                        setCvc={setCvc}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
              }}
              onClick={handleSubmit}>
              付款
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
