'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Stack,
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import CountdownTimer from '@/components/CountdownTimer';
import TestQR from '@/components/TestQR';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { LuSearch, LuTicket, LuArrowRight, LuArrowLeft } from 'react-icons/lu';
import QRCodeBase from '@/components/QRCodeBase';
import { all } from 'axios';
export default function OrderQueryPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [isReceive, setIsReceive] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState('s');
  const [ticketVcList, setTicketVcList] = useState([]);
  const [open, setOpen] = useState(true);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const handleClickOpen = () => {
    setDialogIsOpen(true);
  };
  const [ticketAllList, setTicketAllList] = useState([]);

  const handleClose = () => {
    setDialogIsOpen(false);
  };
  // ttt orderId: "0014ad575a4b4d3aa8d772aada38ff12"
  const onReceiveClick = async () => {
    setIsReceive(true);
    ticketVcList.forEach(async (ticket) => {
      setQrCodeBase64(ticket.qrcode);
    });
  };

  const sendVerifyCode = async (ajaxData) => {
    const res = await fetch('/api/concert/sendVerifyCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ajaxData),
    });
    if (!res.ok) throw new Error('驗證碼發送失敗');
    return res.json();
  };

  const getAllList = async (ajaxData) => {
    const res = await fetch('/api/concert/allList', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ajaxData),
    });
    if (!res.ok) throw new Error('驗證碼發送失敗');
    return res.json();
  };

  const addData = async () => {
    try {
      const res = await fetch(`/api/concert/getVcQrcode?id=${verifyResult.message}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('API 回傳資料:', data);
      setTicketVcList(data.ticketVcDTOList);
      return data;
    } catch (err) {
      console.error('addData 失敗:', err);
      return null;
    }
  };

  const handleSearchold = async () => {
    console.log('訂單編號:', orderNumber);
    console.log('信箱:', email);
    let ajaxData = {
      orderId: orderNumber,
      email: email,
    };

    try {
      const verifyResult = await sendVerifyCode(ajaxData);
      console.log('驗證成功', verifyResult);
      setVerifyResult(verifyResult);

      /* const addResult = await addData(verifyResult);
      console.log('新增成功', addResult);
      console.log(ticketVcList); */
      handleClickOpen();

      // return addResult;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleSearch = async () => {
    console.log('訂單編號:', orderNumber);
    console.log('信箱:', email);
    let ajaxData = {
      orderId: orderNumber,
      email: email,
    };

    try {
      const allList = await getAllList(ajaxData);
      setTicketAllList(allList);
      console.log(allList);

      // const verifyResult = await getAllList(ajaxData);
      // console.log('驗證成功', verifyResult);
      // setVerifyResult(verifyResult);

      /* const addResult = await addData(verifyResult);
      console.log('新增成功', addResult);
      console.log(ticketVcList); */
      // handleClickOpen();

      // return addResult;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  const rows = [
    createData('冰淇淋', 200, 6.0),
    createData('蛋糕', 300, 9.0),
    createData('餅乾', 150, 4.0),
  ];

  const isErrorMessage = verifyResult?.message?.includes('請確認資訊是否正確');
  console.log('isErrorMessage', isErrorMessage);
  return (
    <>
      <Dialog
        open={dialogIsOpen}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            },
          },
        }}>
        <Box display="flex" alignItems="stretch">
          <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <DialogContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                請輸入信箱驗證碼
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#fff8e1',
                  color: '#b26a00',
                  borderRadius: 2,
                  p: 1,
                  mb: 2,
                }}>
                <WarningAmberIcon sx={{ mr: 1 }} />
                <Typography variant="body2" fontWeight={600}>
                  請於 5 分鐘內完成驗證碼驗證，否則將重新查詢訂單
                </Typography>
              </Box>

              <TextField
                label="信箱驗證碼"
                defaultValue={verifyResult?.message || ''}
                placeholder="請輸入信箱驗證碼"
                fullWidth
              />

              <Button
                variant="contained"
                onClick={addData}
                sx={{ mt: 3, py: 1.3, fontWeight: 600 }}>
                發送驗證信
              </Button>
            </DialogContent>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {ticketVcList.length > 0 && (
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
              <TestQR oriTicketList={ticketVcList} />
            </Box>
          )}
        </Box>

        {/*  */}
        {/*  */}
        <DialogActions>
          <Button onClick={() => setDialogIsOpen(false)}>關閉</Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#f5f6fa',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          訂單查詢
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          輸入您的訂單編號，即可立即取票
        </Typography>

        <Card
          elevation={0}
          sx={{
            width: { xs: '80%', md: '50%' },
            borderRadius: 2,
            border: (t) => `1px sold ${t.palette.divider}`,
            backgroundColor: '#FFFFFF',
          }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-around', gap: 4 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Box
                color="primary.main"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LuSearch size={30} />
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                步驟一：查詢您的訂單
              </Typography>

              <Typography variant="body2" mb={1}>
                請輸入完整的訂單編號進行查詢
              </Typography>

              <Stack spacing={2} sx={{ width: '100%' }}>
                <TextField
                  label="訂單編號"
                  placeholder="請輸入訂單編號"
                  fullWidth
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  sx={{ my: 2 }}
                />

                <TextField
                  label="信箱"
                  placeholder="請輸入信箱"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ my: 2 }}
                />

                <Button fullWidth variant="contained" color="primary" onClick={handleSearch}>
                  查詢訂單
                </Button>
              </Stack>

              <Typography variant="caption" display="block" mt={2} color="text.secondary">
                找不到訂單編號？請確認您的購票信箱
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>品項</TableCell>
                <TableCell align="right">卡路里</TableCell>
                <TableCell align="right">脂肪 (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}

        {/* switch (status) {
    case "PENDING":
        return "尚未領取票券";
    case "TRADING":
        return "票券販售中";
    case "ACTIVE":
        return "票券持有中";
    case "REVOKED":
        return "票券已撤銷";
    default:
        return "其他狀態：" + status;
} */}
        <Grid container spacing={1} sx={{ flexDirection: 'column' }}>
          {/* <Accordion key={index} sx={{ mb: 2 }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold">
                {item.name} - {item.line}排{item.seat}號
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                <TextField
                  fullWidth
                  size="small"
                  label="姓名"
                  value={item.name}
                  onChange={(e) => handleUserChange(index, e.target.value)}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="信箱"
                  value={item.email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                />
              </Stack>
              vcStatus
            </AccordionDetails>
          </Accordion> */}
          {ticketAllList?.map((item, index) => (
            <Grid
              key={index}
              sx={{
                borderRadius: 1,
                gap: 1,
                minWidth: '100%',
                display: 'flex',
              }}>
              <Card sx={{ width: '100%', borderRadius: 3, p: 1, position: 'sticky', top: 20 }}>
                {/*  <Box
                color="primary.main"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {item.icon}
              </Box> */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    姓名：
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>{item.name}</strong>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    信箱：
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>{item.email}</strong>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    座位：
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <strong>
                      {item.area} - {item.line}排{item.seat}號
                    </strong>
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
