'use client';
import { Container, Grid, Box, Item } from '@mui/material';
import EventHeader from './sections/EventHeader';
import EventInfoCard from './sections/EventInfoCard';
import VenueInfo from './sections/VenueInfo';
import TicketOptions from './sections/TicketOptions';

export default function Page() {
  const tickets = [
    {
      name: 'VIP搖滾區',
      desc: '最佳視野，專享雙邊通道',
      price: 8800,
      badge: '僅剩3張',
      status: 'limited',
    },
    {
      name: '搖滾區A',
      desc: '超近舞台，近距離體驗',
      price: 6600,
      badge: '餘票不多',
      status: 'few',
    },
    {
      name: '看台區A',
      desc: '舒適座位，完整視野',
      price: 4400,
      badge: '充足',
      status: 'ok',
    },
    {
      name: '看台區B',
      desc: '經濟實惠，良好視野',
      price: 2800,
      badge: '充足',
      status: 'ok',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        gap: 3,
      }}
    >
      <Box sx={{ width: '75%' }}>
        <EventHeader />
        <EventInfoCard />
        <VenueInfo />
      </Box>
      <Box sx={{ width: '25%' }}>
        <TicketOptions tickets={tickets} />
      </Box>
    </Box>

    // <Grid container spacing={3}>
    //   <Grid item xs={12} sm={8}>
    //     <EventHeader />
    //     <EventInfoCard />
    //     <VenueInfo />
    //   </Grid>
    //   <Grid item xs={12} sm={4}>
    //     <TicketOptions tickets={tickets} />
    //   </Grid>
    // </Grid>
  );
}
