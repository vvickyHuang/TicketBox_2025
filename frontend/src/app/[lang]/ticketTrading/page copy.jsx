'use client';
import * as React from 'react';

import { useEffect, useState } from 'react';

import {
  Container,
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Divider,
  DialogActions,
} from '@mui/material';
import { LuPlus, LuX } from 'react-icons/lu';
import VPQR from '@/components/VPQR';

import FilterSidebar from './sections/FilterSidebar';
import TicketList from './sections/TicketList';
import ShelvesDialog from '@/components/ShelvesDialog';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useI18n } from '@/context/i18nContext';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setBuyInfo } from '@/lib/features/globalSlice';

export default function Page() {
  const dispatch = useAppDispatch();

  const { buyInfo, tradingList } = useAppSelector((state) => state.global);

  const [tabList, setTabList] = useState([
    { key: 'all', label: '所有票券', isActive: true },
    { key: 'sell', label: '售票', isActive: false },
    { key: 'buy', label: '徵票', isActive: false },
  ]);
  const [ticketVcList, setTicketVcList] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [ticketsList, setTicketsList] = useState([]);
  const [hasTicketList, setHasTicketList] = useState([]);

  const [shelvesInfo, setShelvesInfo] = useState({});
  const [sellTicketNum, setSellTicketNum] = useState(0);
  const [dialogType, setDialogType] = useState('');
  const initData = async () => {
    try {
      const res = await fetch('/api/trading');
      const data = await res.json();
      setTicketsList(data.data);
    } catch (err) {
      console.error(err);
    }

    try {
      const hasTicketRes = await fetch(`/api/user/hasTicket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mamberId: 'aa' }),
      });
      const hasTicketData = await hasTicketRes.json();

      console.log(hasTicketData);
      setHasTicketList(hasTicketData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const handleSelect = (updatedList) => {
    setTabList(updatedList);
  };

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem('buyInfo'));
    if (session === null) return;
    const info = session;
    if (info) {
      setShelvesInfo(info);
      sessionStorage.setItem('buyInfo', JSON.stringify(info));
    }
  }, [buyInfo]);
  console.log('88888', shelvesInfo);
  console.log(tradingList);
  /* useEffect(() => {
    const allHasShelvesData = ticketVcList.every((item) => !!item.shelvesData);
    console.log('allHasShelvesData', allHasShelvesData, ticketVcList);
    if (allHasShelvesData) return; // ❌ 有缺 → 提前結束
    console.log('有缺 shelvesData，可以進行後續動作');
    const fetchData = async () => {
      try {
        const updatedList = await Promise.all(
          ticketVcList.map(async (item) => {
            // 打 API

            const res = await fetch(`/api/trading/ticketTrading`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                mode: 'TRADING',
              }),
            });
            const resData = await res.json();

            // 回傳新的 item 給 Promise.all
            return {
              ...item,
              shelvesData: resData, // 存回 shelvesData
            };
          }),
        );
        console.log('updatedList', updatedList);
        setTicketVcList(updatedList);
        dispatch(setBuyInfo(updatedList));
        sessionStorage.setItem('buyInfo', JSON.stringify(updatedList));
      } catch (err) {
        console.error('fetch ticket data error:', err);
      }
    };

    if (ticketVcList.length > 0) fetchData();
  }, []); */

  useEffect(() => {
    if (tradingList.id === undefined) return;

    // 👉 tradingList 一更新就會跑這裡
    console.log('tradingList updated:', tradingList);
    setTicketsList((prev) => [tradingList, ...prev]);

    // 你要做的事情
  }, [tradingList]);
  const fetchData = async () => {
    try {
      const updatedList = await Promise.all(
        buyInfo.ticketList.map(async (item) => {
          const res = await fetch(`/api/trading/ticketTrading`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mode: 'TRADING',
            }),
          });
          const resData = await res.json();

          // 回傳新的 item 給 Promise.all
          return {
            ...item,
            shelvesData: resData, // 存回 shelvesData
          };
        })
      );
      console.log('updatedList', updatedList);
      setTicketVcList(updatedList);

      const updatedBuyInfo = {
        ...buyInfo,
        ticketList: updatedList,
      };
      dispatch(setBuyInfo(updatedBuyInfo));
      sessionStorage.setItem('buyInfo', JSON.stringify(updatedBuyInfo));
      setDialogIsOpen(true);
    } catch (err) {
      console.error('fetch ticket data error:', err);
    } finally {
      setDialogIsOpen(true);
    }
  };

  const fetchData2 = async () => {
    try {
      const updatedList = await Promise.all(
        buyInfo.ticketList.map(async (item) => {
          const res = await fetch(`/api/trading/ticketTrading`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mode: 'CANCEL',
            }),
          });
          const resData = await res.json();

          // 回傳新的 item 給 Promise.all
          return {
            ...item,
            cancelData: resData, // 存回 cancelData
          };
        })
      );
      console.log('updatedList', updatedList);
      setTicketVcList(updatedList);

      const updatedBuyInfo = {
        ...buyInfo,
        ticketList: updatedList,
      };
      dispatch(setBuyInfo(updatedBuyInfo));
      sessionStorage.setItem('buyInfo', JSON.stringify(updatedBuyInfo));
      setDialogIsOpen(true);
    } catch (err) {
      console.error('fetch ticket data error:', err);
    } finally {
      setDialogIsOpen(true);
    }
  };

  const handleOpenDialog = () => {
    setDialogType('shelves');
    console.log('hasTicketList', buyInfo.ticketList);
    const allHasShelvesData = buyInfo.ticketList.every((item) => !!item.shelvesData);
    console.log('allHasShelvesData', allHasShelvesData);
    if (allHasShelvesData) {
      setDialogIsOpen(true);
      return;
    }
    console.log('有缺 shelvesData，可以進行後續動作');
    fetchData();
  };

  const handleCancelDialog = () => {
    setDialogType('cancel');
    console.log('hasTicketList', buyInfo.ticketList);
    const allHasCancelData = buyInfo.ticketList.every((item) => !!item.cancelData);
    console.log('allHasCancelData', allHasCancelData);
    if (allHasCancelData) {
      setDialogIsOpen(true);
      return;
    }
    console.log('有缺 cancelData，可以進行後續動作');
    fetchData2();
  };

  const onClickSellTickets = () => {
    // setIsBringVC(true);
    fetchData();
    // console.log('sellTicketNum', sellTicketNum);
  };
  const formatSeats = (list) => {
    // 依 name+line 分組
    const groups = {};
    list.forEach(({ name, line, seat }, index) => {
      if (index !== 0) return;
      const key = `${name}-${line}`;
      groups[key] ??= { name, line, seats: [] };
      groups[key].seats.push(Number(seat));
    });

    // 格式化輸出
    return Object.values(groups)
      .map(({ name, line, seats }) => {
        seats.sort((a, b) => a - b);
        const seatText = seats.length > 1 ? `${seats[0]}-${seats[seats.length - 1]}` : seats[0];
        return `${name} ${line} ${seatText}號 (${seats.length}張)`;
      })
      .join(', ');
  };

  const onShelvesTicketClick = () => {
    console.log('ticketsList', ticketsList);
    console.log('shelvesInfo', shelvesInfo);

    const { ticketList, concertInfo, info } = shelvesInfo;
    // const grandTotal = ticketList[0].reduce((sum, t) => sum + t.qty * t.price, 0);
    const generateShortId = () => Math.random().toString(36).substring(2, 5);

    const tempObj = {
      id: generateShortId(),
      title: concertInfo.title,
      date: info?.[1]?.value,
      location: concertInfo.location,
      seat: formatSeats(shelvesInfo.ticketList),
      price: ticketList?.[0]?.price,
      tags: ['售票', 'VIP', '含SOUNDCHECK'],
      status: 'sell',
      seatImg:
        'https://static.tixcraft.com/images/activity/field/25_sjtp_7c2e042840f15cce3d866abd1dd0cb27.jpg',
      image:
        'https://static.tixcraft.com/images/activity/25_sjtp_853cb581812587601551359ae0ef9ed2.jpeg',
      seller: {
        name: 'Mike Chen',
      },
      shelvesInfo: shelvesInfo,
    };
    console.log('tempObj', tempObj);
    setTicketsList((prev) => [tempObj, ...prev]);
    setDialogIsOpen(false);
  };

  const onCancelTicketClick = () => {
    console.log('取消販售我的票券');
    setDialogIsOpen(false);
  };

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
