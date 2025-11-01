'use client';

import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Chip } from '@mui/material';

const events = [
  {
    id: 1,
    title: 'Taylor Swift 世界巡迴演唱會',
    date: '2024.11.15',
    location: '台北小巨蛋',
    price: '$2,800',
    status: '熱賣中',
    image: '/img/event1.jpg',
  },
  {
    id: 2,
    title: '五月天演唱會',
    date: '2024.12.20',
    location: '高雄巨蛋',
    price: '$1,800',
    status: '預售中',
    image: '/img/event1.jpg',
  },
  {
    id: 3,
    title: '維也納新年音樂會',
    date: '2024.10.30',
    location: '國家音樂廳',
    price: '$3,200',
    status: '即將開賣',
    image: '/img/event1.jpg',
  },
  {
    id: 4,
    title: '歌劇魅影',
    date: '2024.11.08',
    location: '台北表演藝術中心',
    price: '$2,200',
    status: '預售中',
    image: '/img/event1.jpg',
  },
];

import HeroCarousel from './sections/HeroCarousel';

export default function EventSection() {
  return (
    <>
      <HeroCarousel></HeroCarousel>

      <Box sx={{ mt: 8, px: { xs: 2, md: 8 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant='h6' fontWeight='bold'>
            熱門活動
          </Typography>
          <Typography sx={{ color: '#7B61FF', fontWeight: 500, cursor: 'pointer' }}>
            查看全部
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <Card
                sx={{
                  width: 280, // 👈 固定寬度
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
                    height: 180,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f3f3f3',
                  }}
                >
                  <CardMedia
                    component='img'
                    image={event.image}
                    alt={event.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <CardContent sx={{ position: 'relative', pt: 2 }}>
                  <Chip
                    label={event.status}
                    size='small'
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: 16,
                      backgroundColor:
                        event.status === '熱賣中'
                          ? '#FF6B6B'
                          : event.status === '預售中'
                          ? '#7B61FF'
                          : '#A0AEC0',
                      color: '#fff',
                      fontSize: 12,
                    }}
                  />
                  <Typography variant='subtitle1' fontWeight='bold' mt={1}>
                    {event.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {event.location}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {event.date}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <Typography fontWeight='bold' color='#7B61FF'>
                      {event.price}
                    </Typography>
                    <Button
                      variant='contained'
                      size='small'
                      sx={{
                        backgroundColor: '#7B61FF',
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#6A4FE0' },
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
