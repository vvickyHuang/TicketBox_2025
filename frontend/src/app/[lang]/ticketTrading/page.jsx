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
      const res = await fetch('/api/sellTicket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log(data);
      let updatedList = [];
      data.forEach((item) => {
        let obj = {
          id: item.concertId,
          title: 'BTS PERMISSION TO DANCE ON STAGE - TAIPEI',
          date: '2025/12/20(六) 19:30',
          location: '臺北大巨蛋',
          seat: `${item.area}區 第${item.line}排 ${item.seat}號 (1張)`,
          price: 6880,
          tags: ['售票', `${item.area}區`],
          status: 'sell',
          seatImg: '/aiimg/btsseat.png',
          image: '/aiimg/btsbg.png',
          seller: {
            name: 'Mike Chen',
          },
          ticketList: [
            {
              areaKey: item.area,
              email: '',
              line: item.line,
              name: `${item.area}區`,
              price: 6880,
              seat: item.seat,
              user: '',
              vcBindToken: item.vcBindToken,
            },
          ],
        };
        updatedList.push(obj);
      });
      setTicketsList(updatedList);

      /* if (tradingList.id !== undefined) {
        data.data.unshift(tradingList);
      }
      setTicketsList(data.data); */
      /* {
            "id": 1,
            "title": "SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI",
            "date": "2025/11/14 (五) 19:30",
            "location": "臺北大巨蛋",
            "seat": "特A1區 第5排 15-16號 (2張)",
            "price": 8500,
            "tags": [
                "售票",
                "VIP",
                "含SOUNDCHECK"
            ],
            "status": "sell",
            "seatImg": "/aiimg/sjseat.png",
            "image": "/aiimg/sjbg.png",
            "seller": {
                "name": "Mike Chen"
            }
        }, */
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  // useEffect(() => {
  //   if (tradingList.id === undefined) return;

  //   // 👉 tradingList 一更新就會跑這裡
  //   console.log('tradingList updated:', tradingList);
  //   setTicketsList((prev) => [tradingList, ...prev]);

  //   // 你要做的事情
  // }, [tradingList]);

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'flex-start',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}>
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
