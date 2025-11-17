'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
import { LuCalendarDays, LuTimer, LuMapPin, LuTicket, LuPlus, LuMinus } from 'react-icons/lu';
import {
  Grid,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
  Skeleton,
} from '@mui/material';

import { useI18n } from '@/context/i18nContext';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setBuyInfo } from '@/lib/features/globalSlice';
import { useIsMobile } from '@/hook/useIsMobile';

export default function Page() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateSessions = searchParams.get('date');
  const lang = pathname.split('/')[1] || 'en';
  const t = useI18n();
  const isMobile = useIsMobile();

  const { buyInfo } = useAppSelector((state) => state.global);

  const params = useParams();
  const id = params.id;

  const [loadingMap, setLoadingMap] = useState({ isLoadingInfo: true, isLoadingSelect: true });
  const [concertInfo, setConcertInfo] = useState(null);
  const [ticketList, setTicketList] = useState([]);
  const [info, setInfo] = useState([
    { icon: <LuTicket size={24} />, label: '售票日期', value: '', key: 'saleDate' },
    { icon: <LuCalendarDays size={24} />, label: '購買演出日期', value: '', key: 'date' },
    { icon: <LuTimer size={24} />, label: '演出時間', value: '', key: 'time' },
    { icon: <LuMapPin size={24} />, label: '演出場地', value: '', key: 'location' },
  ]);

  const grandTotal = ticketList.reduce((sum, t) => sum + t.qty * t.price, 0);
  const totalQty = ticketList.reduce((sum, t) => sum + t.qty, 0);

  const initData = async () => {
    setLoadingMap((prev) => ({ ...prev, isLoadingInfo: false }));

    try {
      const res = await fetch(`/api/concert/${id}/info`);
      const resData = await res.json();
      const data = resData.find((item) => item.id.toString() === id);
      const ticketTemplates = data.dateArr.find((item) => item.date === dateSessions);

      const mapping = {
        演出場地: 'location',
        購買演出日期: '購買演出日期',
        演出時間: '演出時間',
        售票日期: 'saleDate',
      };

      const updateInfo = info.map((item) => {
        let value = data[mapping[item.label]] || '';

        if (item.label === '購買演出日期') {
          value = `${ticketTemplates.date} `;
        } else if (item.label === '演出時間') {
          value = `${ticketTemplates.time}`;
        }

        return { ...item, value };
      });
      setInfo(updateInfo);
      setConcertInfo(data);
      setTimeout(() => {
        setLoadingMap((prev) => ({ ...prev, isLoadingSelect: false }));
      }, 200);

      try {
        const res = await fetch(`/api/concert/${id}/tickets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticketTemplates: ticketTemplates.tickets }),
        });
        const data = await res.json();
        setTicketList(data.tickets);
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (index, delta) => {
    const newList = [...ticketList];
    newList[index].qty = Math.max(0, newList[index].qty + delta);
    setTicketList(newList);
  };

  const generateNewArr = (arr) => {
    const newArr = [];

    arr.forEach((item) => {
      if (item.qty > 0) {
        const randomStart = Math.floor(Math.random() * 100) + 1;
        const line = Math.floor(Math.random() * 20) + 1;

        for (let i = 0; i < item.qty; i++) {
          newArr.push({
            ...item,
            line,
            seat: `${String(randomStart + i).padStart(2, '0')}`,
            user: '',
          });
        }
      }
    });

    return newArr;
  };

  const handleNext = () => {
    let newTicketList = generateNewArr(ticketList);
    setTicketList(newTicketList);
    const cleanedInfo = info.map(({ icon, ...rest }) => rest);

    const updatedBuyInfo = {
      ...buyInfo,
      ticketList: newTicketList,
      concertInfo,
      info: cleanedInfo,
    };
    dispatch(setBuyInfo(updatedBuyInfo));
    sessionStorage.setItem('buyInfo', JSON.stringify(updatedBuyInfo));
    router.push(`/${lang}/payment`);

    setLoadingMap({ isLoadingInfo: true, isLoadingSelect: true });
  };

  useEffect(() => {
    initData();
  }, []);

  return isMobile ? (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        p: 3,
        gap: 2,
        flexDirection: 'column',
      }}>
      {loadingMap.isLoadingInfo ? (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 3 }} />
        </Box>
      ) : (
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
              image={concertInfo?.image}
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
              {concertInfo?.title}
            </Typography>
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
              {info.map((item, index) => (
                <Grid
                  key={index}
                  sx={{
                    borderRadius: 1,
                    gap: 1,
                    minWidth: '150px',
                    display: 'flex',
                  }}>
                  <Box
                    color="primary.main"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.icon}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.label}
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>{item.value}</strong>
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ width: '100%' }}>
              <React.Fragment>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={1} sx={{ flexDirection: 'column' }}>
                  {ticketList.map((item, index) => (
                    <Grid
                      key={index}
                      sx={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 3,
                        px: 2,
                        py: 1.5,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1.5, sm: 0 },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(90,62,186,0.15)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#F3E9FF',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(90,62,186,0.15)',
                        },
                      }}>
                      <Box
                        sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                          // flexDirection: 'column',
                          gap: 1,
                          width: { xs: '100%', sm: 'auto' },
                        }}>
                        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
                          {item.name}
                        </Typography>
                        {item.status !== 'ok' && (
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              px: 1,
                              py: 0.3,
                              borderRadius: 1.5,
                              backgroundColor:
                                item.badge?.includes('僅剩') || item.badge?.includes('售罄')
                                  ? '#FFE0E0'
                                  : '#E5E9FF',
                            }}>
                            <Typography
                              variant="caption"
                              fontWeight="500"
                              color={
                                item.badge?.includes('僅剩') || item.badge?.includes('售罄')
                                  ? '#D64545'
                                  : '#4A56B1'
                              }>
                              {item.badge}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      {/* <Box
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
 */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: { xs: '100%', sm: '300px' },
                          mt: { xs: 1, sm: 0 },
                        }}>
                        <Typography variant="h6" fontWeight="bold">
                          NT$ {item.price.toLocaleString()}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #D1C4E9',
                            borderRadius: 2,
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)',
                          }}>
                          <IconButton
                            size="small"
                            sx={{
                              color: item.qty === 0 ? 'rgba(0,0,0,0.26)' : '#323332',
                              '&:hover': { backgroundColor: 'rgba(90,62,186,0.08)' },
                            }}
                            onClick={() => handleChange(index, -1)}
                            disabled={item.qty === 0}>
                            <LuMinus />
                          </IconButton>

                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.8,
                              minWidth: 40,
                              textAlign: 'center',
                              fontSize: '1rem',
                              fontWeight: 500,
                              color:
                                totalQty >= 4 || item.remaining <= item.qty
                                  ? 'rgba(0, 0, 0, 0.38)'
                                  : '#323332',
                              borderLeft: '1px solid rgba(0,0,0,0.08)',
                              borderRight: '1px solid rgba(0,0,0,0.08)',
                            }}>
                            {item.qty}
                          </Box>

                          <IconButton
                            size="small"
                            sx={{
                              color:
                                totalQty >= 4 || item.remaining <= item.qty
                                  ? 'rgba(0,0,0,0.26)'
                                  : '#323332',
                              '&:hover': { backgroundColor: 'rgba(90,62,186,0.08)' },
                            }}
                            onClick={() => handleChange(index, 1)}
                            disabled={totalQty >= 4 || item.remaining <= item.qty}>
                            <LuPlus />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid size={{ xs: 12, md: 5 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f3f3f3',
                      transition: 'width 0.6s ease, transform 0.6s ease',
                      cursor: 'pointer',
                      '& img': {
                        transition: 'transform 0.6s ease',
                      },
                    }}>
                    <CardMedia
                      component="img"
                      image={concertInfo?.locationImage}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  訂單明細
                </Typography>

                <Grid container spacing={1} sx={{ flexDirection: 'column' }}>
                  {ticketList.map(
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
                              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                              width: { xs: '100%', sm: '300px' }, // 手機撐滿、桌面固定寬
                              mt: { xs: 1, sm: 0 },
                            }}>
                            <Typography variant="h6" fontWeight="bold">
                              NT$ {item.price.toLocaleString()} x {item.qty}
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
                  <Typography fontWeight="600">總金額 </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    NT$ {grandTotal?.toLocaleString()}
                  </Typography>
                </Grid>
              </React.Fragment>
            </Box>
          </Box>
        </Box>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.3,
          fontWeight: 600,
        }}
        onClick={handleNext}
        disabled={totalQty === 0}>
        下一步
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        p: 3,
        gap: 2,
        flexDirection: 'column',
      }}>
      {loadingMap.isLoadingInfo ? (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 3 }} />
        </Box>
      ) : (
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
              image={concertInfo?.image}
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
              {concertInfo?.title}
            </Typography>
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
              {info.map((item, index) => (
                <Grid
                  key={index}
                  sx={{
                    borderRadius: 1,
                    gap: 1,
                    minWidth: '150px',
                    display: 'flex',
                  }}>
                  <Box
                    color="primary.main"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.icon}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.label}
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>{item.value}</strong>
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ width: '100%' }}>
              <React.Fragment>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f3f3f3',
                        transition: 'width 0.6s ease, transform 0.6s ease',
                        cursor: 'pointer',
                        '& img': {
                          transition: 'transform 0.6s ease',
                        },
                      }}>
                      <CardMedia
                        component="img"
                        image={concertInfo?.locationImage}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Grid
                      sx={{
                        p: 2,
                        gap: 1,
                        minWidth: '150px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Typography
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <strong>票種</strong>
                      </Typography>

                      <Box
                        sx={{
                          width: '300px',
                          display: 'flex',
                          justifyContent: 'start',
                          alignItems: 'center',
                        }}>
                        <Typography
                          display="flex"
                          alignItems="center"
                          gap={1}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <strong>票價</strong>
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid container spacing={1} sx={{ flexDirection: 'column' }}>
                      {loadingMap.isLoadingSelect ? (
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                          }}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton
                              key={index}
                              variant="rectangular"
                              width="100%"
                              height={40}
                              sx={{ borderRadius: 3, mb: 1 }}
                            />
                          ))}
                        </Box>
                      ) : (
                        ticketList.map((item, index) => (
                          <Grid
                            key={index}
                            sx={{
                              backgroundColor: '#FFFFFF',
                              borderRadius: 3,
                              px: 2,
                              py: 1,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                              border: '1px solid rgba(90,62,186,0.15)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: '#F3E9FF',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(90,62,186,0.15)',
                              },
                            }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
                                {item.name}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                width: '300px',
                              }}>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                  minWidth: '80px',
                                }}>
                                {item.price.toLocaleString()}
                              </Typography>

                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  border: '1px solid #D1C4E9',
                                  borderRadius: 2,
                                  overflow: 'hidden',
                                  ml: 4,
                                  backgroundColor: '#fff',
                                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)',
                                }}>
                                <IconButton
                                  size="small"
                                  sx={{
                                    color: item.qty === 0 ? 'rgba(0,0,0,0.26)' : '#323332',
                                    '&:hover': { backgroundColor: 'rgba(90,62,186,0.08)' },
                                    transition: 'all 0.2s ease',
                                  }}
                                  onClick={() => handleChange(index, -1)}
                                  disabled={item.qty === 0}>
                                  <LuMinus />
                                </IconButton>

                                <Box
                                  sx={{
                                    px: 1.5,
                                    py: 0.8,
                                    minWidth: 40,
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color:
                                      totalQty >= 4 || item.remaining <= item.qty
                                        ? 'rgba(0, 0, 0, 0.38)'
                                        : '#323332',
                                    borderLeft: '1px solid rgba(0,0,0,0.08)',
                                    borderRight: '1px solid rgba(0,0,0,0.08)',
                                  }}>
                                  {item.qty}
                                </Box>

                                <IconButton
                                  size="small"
                                  sx={{
                                    color:
                                      totalQty >= 4 || item.remaining <= item.qty
                                        ? 'rgba(0,0,0,0.26)'
                                        : '#323332',
                                    '&:hover': { backgroundColor: 'rgba(90,62,186,0.08)' },
                                    transition: 'all 0.2s ease',
                                  }}
                                  onClick={() => handleChange(index, 1)}
                                  disabled={totalQty >= 4 || item.remaining <= item.qty}>
                                  <LuPlus />
                                </IconButton>
                              </Box>

                              {item.status !== 'ok' && (
                                <Box
                                  sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    ml: 2,
                                    px: 1,
                                    py: 0.3,
                                    borderRadius: 1.5,
                                    backgroundColor:
                                      item.badge?.includes('僅剩') || item.badge?.includes('售罄')
                                        ? '#FFE0E0'
                                        : '#E5E9FF',
                                  }}>
                                  <Typography
                                    variant="caption"
                                    fontWeight="500"
                                    color={
                                      item.badge?.includes('僅剩') || item.badge?.includes('售罄')
                                        ? '#D64545'
                                        : '#4A56B1'
                                    }>
                                    {item.badge}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Grid>
                        ))
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  訂單名細
                </Typography>
                <Grid
                  sx={{
                    p: 2,
                    gap: 1,
                    minWidth: '150px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>票種</strong>
                  </Typography>

                  <Box
                    sx={{
                      width: '300px',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}>
                    <Typography
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <strong>票價</strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid container spacing={1} sx={{ flexDirection: 'column' }}>
                  {ticketList.map(
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
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            border: '1px solid rgba(90,62,186,0.15)',
                          }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
                              {item.name}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              width: '300px',
                            }}>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              sx={{
                                minWidth: '80px',
                              }}>
                              <strong>
                                NT$ {item.price.toLocaleString()}x{item.qty}
                              </strong>
                            </Typography>
                          </Box>
                        </Grid>
                      ),
                  )}
                </Grid>

                <Grid
                  sx={{
                    p: 2,
                    gap: 1,
                    minWidth: '150px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>總金額</strong>
                  </Typography>

                  <Box
                    sx={{
                      width: '300px',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}>
                    <Typography
                      color="primary"
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        minWidth: '80px',
                      }}>
                      <strong>NT$ {grandTotal.toLocaleString()}</strong>
                    </Typography>
                  </Box>
                </Grid>
              </React.Fragment>
            </Box>
          </Box>
        </Box>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.3,
          fontWeight: 600,
        }}
        onClick={handleNext}
        disabled={totalQty === 0}>
        下一步
      </Button>
    </Box>
  );
}
