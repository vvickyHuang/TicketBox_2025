'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import {
  Grid,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material';
import { LuCalendarDays, LuTimer, LuMapPin, LuTicket, LuBuilding2 } from 'react-icons/lu';

import Markdown from '@/components/Markdown';
import { useI18n } from '@/context/i18nContext';
import { useIsMobile } from '@/hook/useIsMobile';

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split('/')[1] || 'en';
  const t = useI18n();
  const isMobile = useIsMobile();
  const params = useParams();
  const id = params.id;

  const [loadingMap, setLoadingMap] = useState({ isLoadingInfo: true, isLoadingSelect: true });
  const [concertInfo, setConcertInfo] = useState(null);
  const [ticketDateList, setTicketDateList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isZoom, setIsZoom] = useState(false);

  const [info, setInfo] = useState([
    { icon: <LuTicket size={24} />, label: '售票日期', value: '', key: 'saleDate' },
    { icon: <LuCalendarDays size={24} />, label: '演出日期', value: '', key: 'date' },
    { icon: <LuTimer size={24} />, label: '演出時間', value: '', key: 'time' },
    { icon: <LuMapPin size={24} />, label: '演出場地', value: '', key: 'location' },
  ]);

  const initData = async () => {
    try {
      const res = await fetch(`/api/concert/${id}/info`);
      const resData = await res.json();
      const data = resData.find((item) => item.id.toString() === id);

      const updateInfo = info.map((item) => ({
        ...item,
        value: data[item.key] || '',
      }));
      setInfo(updateInfo);
      setTicketDateList(
        data.dateArr.map((dateItem) => ({
          name: data.title,
          key: dateItem.date,
          areaKey: dateItem.areaKey,
          date: `${dateItem.date} ${dateItem.time}`,
          location: data.location,
          status: data.status,
        }))
      );
      setLoadingMap((prev) => ({ ...prev, isLoadingInfo: false, isLoadingSelect: false }));
      setConcertInfo(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const formatDateToChinese = ({ date, time }) => {
    const d = new Date(date);
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = days[d.getDay()];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 (${weekday}) ${time}`;
  };

  useEffect(() => {
    initData();
  }, []);

  return isMobile ? (
    <Box
      sx={{
        width: '100%',
        alignItems: 'flex-start',
        p: 3,
        gap: 2,
      }}
    >
      {loadingMap.isLoadingInfo ? (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant='rectangular' width='100%' height={400} sx={{ borderRadius: 3 }} />
          <Skeleton variant='rectangular' width='100%' height={350} sx={{ borderRadius: 3 }} />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 3,
            boxShadow: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '66.67%',
              borderRadius: '24px 24px 0 0',
              overflow: 'hidden',
              backgroundColor: '#f3f3f3',
            }}
          >
            <CardMedia
              component='img'
              image={concertInfo?.image}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box sx={{ m: 2 }}>
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
              {info.map((item, index) => (
                <Grid
                  key={index}
                  sx={{
                    borderRadius: 1,
                    gap: 1,
                    minWidth: '150px',
                    display: 'flex',
                  }}
                >
                  <Box
                    color='primary.main'
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      maxWidth: '20%',
                      minWidth: '20%',
                      my: 1,
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    display='flex'
                    alignItems='center'
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <strong>{item.value}</strong>
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {loadingMap.isLoadingSelect ? (
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={100}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={200}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={200}
                  sx={{ borderRadius: 3 }}
                />
              </Box>
            ) : (
              <Box sx={{ width: '100%' }}>
                <Divider sx={{ my: 1 }} />
                <CardContent sx={{ p: 0 }}>
                  <Typography variant='h6' gutterBottom>
                    立即訂票
                  </Typography>

                  {ticketDateList.map(
                    (t, i) =>
                      (selectedDate === '' || selectedDate === t.date) && (
                        <Box
                          key={i}
                          sx={{
                            mb: 3,
                            border: '1px solid #F5EBFF',
                            p: 2,
                            borderRadius: 1,
                            boxShadow: 1,
                            gap: 1,
                          }}
                        >
                          <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <Typography fontWeight='bold'>{t.date}</Typography>
                          </Box>
                          <Typography color='text.secondary'>{t.location}</Typography>

                          <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            sx={{
                              mt: 2,
                              py: 1.3,
                              background: 'linear-gradient(to right, #8b5cf6, #a855f7, #ec4899)',
                            }}
                            onClick={() => router.push(`/${lang}/concert/${id}/new?date=${t.key}`)}
                          >
                            立即購買
                          </Button>
                        </Box>
                      )
                  )}
                </CardContent>
                {/* </Card> */}
                <Divider sx={{ my: 4 }} />
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <Typography variant='h6' gutterBottom>
                活動介紹
              </Typography>
              {concertInfo?.descMD && <Markdown descMD={concertInfo.descMD} />}

              <Box
                onClick={() => setIsZoom(!isZoom)}
                sx={{
                  width: isZoom ? '100%' : '50%',
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
                }}
              >
                <CardMedia
                  component='img'
                  image={concertInfo?.locationImage}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box>
              <Typography variant='h6' gutterBottom>
                場地資訊
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ width: '30px', mr: 1 }}>
                  <LuBuilding2 size={24} />
                </Box>
                <Box sx={{ width: '100%', gap: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography>{concertInfo?.location}</Typography>
                  <Typography color='text.secondary'>{concertInfo?.address}</Typography>

                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '56.25%',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      title='google-map'
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        info[3].value
                      )}&output=embed`}
                      style={{
                        border: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                      loading='lazy'
                      allowFullScreen
                      referrerPolicy='no-referrer-when-downgrade'
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        p: 3,
        gap: 2,
      }}
    >
      {loadingMap.isLoadingInfo ? (
        <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant='rectangular' width='100%' height={400} sx={{ borderRadius: 3 }} />
          <Skeleton variant='rectangular' width='100%' height={350} sx={{ borderRadius: 3 }} />
        </Box>
      ) : (
        <Box
          sx={{
            width: '75%',
            height: '100%',
            borderRadius: 3,
            boxShadow: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '66.67%', // 1024/1536 = 0.6667 → 3:2比例
              borderRadius: '24px 24px 0 0',
              overflow: 'hidden',
              backgroundColor: '#f3f3f3',
            }}
          >
            <CardMedia
              component='img'
              image={concertInfo?.image}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain', // 或 cover 視需求
              }}
            />
          </Box>

          <Box sx={{ m: 2 }}>
            <Grid container spacing={2} sx={{ m: 2 }}>
              {info.map((item, index) => (
                <Grid
                  key={index}
                  sx={{
                    backgroundColor: '#F5EBFF',
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    gap: 1,
                    minWidth: '150px',
                  }}
                >
                  <Box
                    color='primary.main'
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    display='flex'
                    alignItems='center'
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <strong>{item.value}</strong>
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography variant='h6' gutterBottom>
                活動介紹
              </Typography>
              {concertInfo?.descMD && <Markdown descMD={concertInfo.descMD} />}

              <Box
                onClick={() => setIsZoom(!isZoom)}
                sx={{
                  width: isZoom ? '100%' : '50%',
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
                }}
              >
                <CardMedia
                  component='img'
                  image={concertInfo?.locationImage}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box>
              <Typography variant='h6' gutterBottom>
                場地資訊
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ width: '30px', mr: 1 }}>
                  <LuBuilding2 size={24} />
                </Box>
                <Box sx={{ width: '100%', gap: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography>{concertInfo?.location}</Typography>
                  <Typography color='text.secondary'>{concertInfo?.address}</Typography>

                  <iframe
                    title='google-map'
                    width='100%'
                    height='300'
                    style={{ border: 0 }}
                    loading='lazy'
                    allowFullScreen
                    referrerPolicy='no-referrer-when-downgrade'
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      info[3].value
                    )}&output=embed`}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {loadingMap.isLoadingSelect ? (
        <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant='rectangular' width='100%' height={100} sx={{ borderRadius: 3 }} />
          <Skeleton variant='rectangular' width='100%' height={200} sx={{ borderRadius: 3 }} />
          <Skeleton variant='rectangular' width='100%' height={200} sx={{ borderRadius: 3 }} />
        </Box>
      ) : (
        <Box sx={{ width: '25%' }}>
          <Card sx={{ borderRadius: 3, p: 1, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                立即訂票
              </Typography>
              <Select
                fullWidth
                size='small'
                defaultValue=''
                displayEmpty
                sx={{ mb: 3 }}
                onChange={handleChange}
              >
                {selectedDate && <MenuItem value=''>選擇日期</MenuItem>}

                {concertInfo?.dateArr.map(({ date, time }) => (
                  <MenuItem key={date} value={`${date} ${time}`}>
                    {formatDateToChinese({ date, time })}
                  </MenuItem>
                ))}
              </Select>

              {ticketDateList.map(
                (t, i) =>
                  (selectedDate === '' || selectedDate === t.date) && (
                    <Box
                      key={i}
                      sx={{
                        mb: 3,
                        border: '1px solid #F5EBFF',
                        p: 2,
                        borderRadius: 1,
                        boxShadow: 1,
                        gap: 1,
                      }}
                    >
                      <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography fontWeight='bold'>{t.date}</Typography>
                      </Box>
                      <Typography color='text.secondary'>{t.location}</Typography>

                      <Button
                        fullWidth
                        variant='contained'
                        color='secondary'
                        sx={{
                          mt: 2,
                          py: 1.3,
                          background: 'linear-gradient(to right, #8b5cf6, #a855f7, #ec4899)',
                        }}
                        onClick={() => router.push(`/${lang}/concert/${id}/new?date=${t.key}`)}
                      >
                        立即購買
                      </Button>
                    </Box>
                  )
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
