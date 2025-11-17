'use client';
import {
  Container,
  Box,
  Grid,
  CardContent,
  Card,
  CardMedia,
  Typography,
  Divider,
  Paper,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { LuCalendarDays, LuTimer, LuMapPin } from 'react-icons/lu';

import SellerInfo from './sections/SellerInfo';
import { useParams } from 'next/navigation';
export default function TicketPage() {
  const params = useParams();
  const id = params.id;
  const [isZoom, setIsZoom] = useState(false);
  const [ticketsInfo, setTicketsInfo] = useState(null);

  const [info, setInfo] = useState([
    { icon: <LuCalendarDays size={24} />, label: '演出日期', value: '', key: 'date' },
    { icon: <LuTimer size={24} />, label: '演出時間', value: '', key: 'time' },
    { icon: <LuMapPin size={24} />, label: '演出場地', value: '', key: 'location' },
  ]);

  const seatInfoList = [
    { label: '區域', value: ticketsInfo?.seatInfo.area },
    { label: '排', value: ticketsInfo?.seatInfo.row },
    {
      label: '座位號',
      value: ticketsInfo?.seatInfo.number,
    },
    {
      label: '張數',
      value: `${ticketsInfo?.seatInfo.count}`,
    },
  ];

  const ticketInfoList = [
    { label: '票價', value: `NT$ ${ticketsInfo?.price.original.toLocaleString()}` },
    { label: '張數', value: ticketsInfo?.seatInfo.count },
    {
      label: '總金額',
      value: `NT$ ${(ticketsInfo?.price.original * ticketsInfo?.seatInfo.count).toLocaleString()}`,
    },
  ];

  const initData = async () => {
    try {
      const res = await fetch(`/api/trading/${id}/tickets`);
      const resData = await res.json();
      const data = resData.find((item) => item.id.toString() === id);

      const updateInfo = info.map((item) => ({
        ...item,
        value: data[item.key] || '',
      }));
      setInfo(updateInfo);
      setTicketsInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        p: 3,
        gap: 2,
      }}>
      <Box
        sx={{
          width: '75%',
          height: '100%',
          borderRadius: 3,
          boxShadow: 2,
          mb: 3,
        }}>
        <Box
          sx={{
            borderRadius: '24px 24px 0 0',
            width: '100%',
            height: 400,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f3f3f3',
          }}>
          <CardMedia
            component="img"
            image={ticketsInfo?.image}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
        <Box sx={{ m: 2 }}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              活動介紹
            </Typography>
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
              {info.map((item, index) => (
                <Grid
                  key={index}
                  sx={{
                    borderRadius: 1,
                    gap: 1,
                    minWidth: '150px',
                    display: 'flex',
                  }}>
                  <Box
                    color="primary.main"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.icon}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.label}
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>{item.value}</strong>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
            <Paper sx={{ py: 2, px: 3, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                座位資訊
              </Typography>
              <Stack spacing={1}>
                {seatInfoList.map((item, index) => (
                  <Box key={index}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={'space-between'}
                      gap={1}
                      mb={0.5}>
                      <Typography color="textSecondary" sx={{ width: '30%' }}>
                        {item.label}
                      </Typography>
                      <Typography
                        display="flex"
                        justifyContent="end"
                        fontWeight={500}
                        sx={{ width: '70%' }}>
                        {item.value || '-'}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>

            <Paper sx={{ p: 2, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {ticketsInfo?.status === 'sell' ? '售票資訊' : '徵票資訊'}
              </Typography>
              <Stack spacing={1}>
                {ticketInfoList.map((item, index) => (
                  <Box key={index}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={'space-between'}
                      gap={1}
                      mb={0.5}>
                      <Typography color="textSecondary" sx={{ width: '30%' }}>
                        {item.label}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        display="flex"
                        justifyContent="end"
                        sx={{ width: '70%' }}>
                        {item.value || '-'}
                      </Typography>

                      {/* {index} */}
                    </Box>
                    {index === 1 && <Divider sx={{ mt: 2, mb: 1 }} />}
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              演出場地座位圖
            </Typography>

            <Box
              onClick={() => setIsZoom(!isZoom)}
              sx={{
                width: isZoom ? '100%' : '50%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f3f3f3',
                transition: 'width 0.6s ease, transform 0.6s ease',
                cursor: 'pointer',
                '& img': {
                  transition: 'transform 0.6s ease',
                },
              }}>
              <CardMedia
                component="img"
                image={ticketsInfo?.locationImage}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: '25%' }}>
        <SellerInfo ticket={ticketsInfo} />
      </Box>
    </Box>
  );
}
