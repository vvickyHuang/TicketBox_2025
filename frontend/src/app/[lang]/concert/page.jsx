'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Skeleton,
} from '@mui/material';
import ConcertCarousel from './sections/Carousel';
import { useI18n } from '@/context/i18nContext';
import { styled } from '@mui/system';
import HotChip from './sections/HotChip';
export default function ConcertPage() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split('/')[1] || 'en';
  const t = useI18n();
  const [loadingMap, setLoadingMap] = useState({ isLoadingCarousel: true });
  const [concertList, setConcertList] = useState([]);
  const [tab, setTab] = useState(0);
  const initData = async () => {
    try {
      const res = await fetch('/api/concert');
      const data = await res.json();
      setConcertList(data.data);
      setLoadingMap((prev) => ({ ...prev, isLoadingCarousel: false }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (_, newValue) => setTab(newValue);

  const filteredList = concertList.filter((item) => {
    if (tab === 0) return true;
    if (tab === 1) return item.isHot;
    return true;
  });

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <ConcertCarousel></ConcertCarousel>
      <Box sx={{ my: 1, px: { xs: 2, md: 8 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            textColor='primary'
            indicatorColor='primary'
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { fontWeight: 'bold' },
            }}
          >
            <Tab label={t.main.Allactivities} />
            <Tab label='熱門活動' />
          </Tabs>
          <Button color='primary'>查看全部</Button>
        </Box>

        <Grid container spacing={2}>
          {loadingMap.isLoadingCarousel
            ? Array.from({ length: 6 }).map((_, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}
                  key={index}
                  sx={{ display: 'flex' }}
                >
                  <Skeleton
                    variant='rectangular'
                    width='100%'
                    height={300}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))
            : filteredList.map((event) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}
                  key={event.id}
                  sx={{ display: 'flex' }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1,
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: '#f3f3f3',
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={event.image}
                        alt={event.title}
                        sx={{
                          width: '100%',
                          height: 'auto',
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        height: '100%',
                      }}
                    >
                      <Box>
                        <HotChip status={event.status} />
                        {/* <Chip
                          label={event.status}
                          size='small'
                          sx={{
                            position: 'absolute',
                            top: -12,
                            left: 16,
                            backgroundColor: event.status === '熱賣中' ? '#FF6B6B' : '#A0AEC0',
                            color: '#fff',
                            fontSize: 12,
                          }}
                        /> */}
                        <Typography
                          variant='subtitle1'
                          fontWeight='bold'
                          mt={1}
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2, // 限制最多兩行
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {event.title}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {event.location}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {event.date}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          mt: 2,
                        }}
                      >
                        <Button
                          aria-label={`購買 ${event.title} 的票券`}
                          onClick={() => router.push(`/${lang}/concert/${event.id}`)}
                          variant='contained'
                          size='small'
                          sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                          }}
                        >
                          購票
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
    </>
  );
}
