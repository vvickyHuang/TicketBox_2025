'use client';
import { Container, Box, Grid } from '@mui/material';
import TicketHeader from './sections/TicketHeader';
import SeatInfo from './sections/SeatInfo';
import PriceInfo from './sections/PriceInfo';
import TicketFeatures from './sections/TicketFeatures';
import SellerInfo from './sections/SellerInfo';
import RelatedTickets from './sections/RelatedTickets';

export default function TicketPage() {
  const ticket = {
    id: 1,
    title: '周杰倫 2024 嘉年華世界巡迴演唱會',
    image: '/img/event1.jpg',
    date: '2024年12月15日 (六)',
    time: '19:30',
    location: '台北小巨蛋',
    seatInfo: {
      area: 'VIP A區',
      row: '第3排',
      number: '15-16號',
      count: 2,
    },
    price: {
      original: 8800,
      sale: 7500,
      fee: 200,
      total: 15200,
    },
    venueImage: '/venue-map.jpg',
    features: ['保證真票', '絕佳視野', 'VIP座區', '贈品包含'],
    seller: {
      name: 'Mike Chen',
      avatar: '/avatar2.jpg',
      rating: 4.9,
      isMessage: true,
      isEmail: true,
      joined: '2020年',
      response: '五分鐘前',
    },
  };

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
        <TicketHeader ticket={ticket} />
        <div>
          <SeatInfo ticket={ticket} />
        </div>
        <div>
          {' '}
          <PriceInfo ticket={ticket} />
        </div>
        <TicketFeatures ticket={ticket} />
      </Box>
      <Box sx={{ width: '25%' }}>
        <SellerInfo ticket={ticket} />
      </Box>
    </Box>
  );
}
