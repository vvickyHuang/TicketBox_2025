'use client';
import { Box, Grid, Container } from '@mui/material';
import ProfileSidebar from './sections/ProfileSidebar';
import TicketTabs from './sections/TicketTabs';
import TicketList from './sections/TicketList';

export default function MyTicketsPage() {
  const myTickets = [
    {
      id: 1,
      title: 'Taylor Swift 世界巡迴演唱會',
      date: '2024年11月15日 (五) 19:30',
      location: '台北小巨蛋',
      seat: 'A區 5排 12號',
      price: 3200,
      image: '/img/event1.jpg',
      status: '即將到來',
    },
    {
      id: 2,
      title: '五月天 好好好想見到你演唱會',
      date: '2024年12月8日 (日) 18:00',
      location: '高雄巨蛋',
      seat: '搖滾區 B區 standing',
      price: 2800,
      image: '/img/event1.jpg',
      status: '即將到來',
    },
    {
      id: 3,
      title: 'Ed Sheeran Mathematics Tour',
      date: '2024年9月10日 (二) 19:00',
      location: '台中洲際體育場',
      seat: 'VIP C區 第3排',
      price: 4500,
      image: '/img/event1.jpg',
      status: '已結束',
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
      <Box sx={{ width: '25%' }}>
        <ProfileSidebar />
      </Box>
      <Box sx={{ width: '75%' }}>
        <TicketTabs />
        <TicketList tickets={myTickets} />
      </Box>
    </Box>
  );
}
