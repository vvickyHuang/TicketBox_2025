'use client';
import { Container, Box } from '@mui/material';
import FilterSidebar from './sections/FilterSidebar';
import TicketList from './sections/TicketList';

export default function Page() {
  const tickets = [
    {
      id: 1,
      title: 'Taylor Swift The Eras Tour',
      date: '2024年12月15日 19:30',
      location: '台北小巨蛋',
      seat: 'A區 第5排 15-16號 (2張)',
      price: 8500,
      originalPrice: 6800,
      tags: ['售票', 'VIP'],
      status: 'sell',
      image: '/img/event1.jpg',
      seller: {
        name: 'Mike Chen',
        avatar: '/avatar1.jpg',
        rating: 4.8,
      },
    },
    {
      id: 2,
      title: 'BTS Yet To Come Concert',
      date: '2024年12月20日 19:00',
      location: '高雄巨蛋',
      seat: '搖滾區 任意位置 (需1張)',
      price: 7200,
      tags: ['徵票', '搖滾區'],
      status: 'buy',
      image: '/img/event1.jpg',
      seller: {
        name: 'Sarah Wang',
        avatar: '/avatar2.jpg',
        rating: 4.9,
      },
    },
  ];

  return (
    <Container maxWidth='xl' sx={{ py: 5 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'flex-start',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 25%' } }}>
          <FilterSidebar />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 75%' } }}>
          <TicketList tickets={tickets} />
        </Box>
      </Box>
    </Container>
  );
}
