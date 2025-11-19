'use client';
import * as React from 'react';

import { useEffect, useState } from 'react';

import { Container, Box } from '@mui/material';

import FilterSidebar from './sections/FilterSidebar';
import TicketList from './sections/TicketList';
import { useAppDispatch, useAppSelector } from '@/lib/store';

export default function Page() {
  const dispatch = useAppDispatch();

  const { tradingList } = useAppSelector((state) => state.global);

  const [ticketsList, setTicketsList] = useState([]);

  const [shelvesInfo, setShelvesInfo] = useState({});
  const initData = async () => {
    try {
      const res = await fetch('/api/trading');
      const data = await res.json();
      if (tradingList.id !== undefined) {
        data.data.unshift(tradingList);
      }
      setTicketsList(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initData();
  }, [tradingList]);

  // useEffect(() => {
  //   if (tradingList.id === undefined) return;

  //   // 👉 tradingList 一更新就會跑這裡
  //   console.log('tradingList updated:', tradingList);
  //   setTicketsList((prev) => [tradingList, ...prev]);

  //   // 你要做的事情
  // }, [tradingList]);

  return (
    <>
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
          <Box sx={{ flexGrow: 1 }}>
            <TicketList tickets={ticketsList} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
