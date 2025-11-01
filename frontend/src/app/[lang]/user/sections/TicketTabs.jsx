import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useState } from 'react';

export default function TicketTabs() {
  const [tab, setTab] = useState(0);
  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h5' fontWeight='bold' mb={1}>
        我的票券
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={2}>
        管理您的所有演唱會票券和活動
      </Typography>
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
        <Tab label='全部票券' />
        <Tab label='即將到來' />
        <Tab label='已結束' />
        <Tab label='已取消' />
      </Tabs>
    </Box>
  );
}
