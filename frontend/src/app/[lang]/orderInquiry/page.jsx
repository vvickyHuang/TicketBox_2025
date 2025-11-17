'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Card, CardContent } from '@mui/material';
import { useIsMobile } from '@/hook/useIsMobile';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TestQR from '@/components/TestQR';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import VPQRNew from '@/components/VPQRNew';
import TicketOrder from './sections/OrderCard';

import { LuSearch } from 'react-icons/lu';
export default function OrderQueryPage() {
  const isMobile = useIsMobile();

  const [orderNumber, setOrderNumber] = useState('1GYU601');
  const [email, setEmail] = useState('hihi@gmail.com');

  const [time, setTime] = useState('');
  const [isReceive, setIsReceive] = useState(false);
  const [ticketVcList, setTicketVcList] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [shelvesData, setShelvesData] = useState({});
  const [dialogType, setDialogType] = useState({});
  const steps = ['查詢訂單', '訂單查詢結果'];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const handleClickOpen = () => {
    setDialogIsOpen(true);
  };
  const [ticketAllList, setTicketAllList] = useState([]);

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
      setIsReceive(true);
      return data;
    } catch (err) {
      console.error('addData 失敗:', err);
      return null;
    }
  };

  const handleSearchold = async (type, index) => {
    setDialogType(type);
    let ajaxData = {
      orderId: orderNumber,
      email: email,
    };

    try {
      const verifyResult = await sendVerifyCode(ajaxData);
      console.log('驗證成功', verifyResult);
      setVerifyResult(verifyResult);
      handleClickOpen();
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
      handleNext();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleShelves = async (type, index) => {
    console.log(index, type);
    setDialogType(type);
    const res = await fetch(`/api/trading/ticketTrading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: type === 'shelves' ? 'TRADING' : 'CANCEL',
      }),
    });
    const resData = await res.json();
    console.log('上架販售結果', resData);
    setShelvesData(resData);
    setDialogIsOpen(true);
    // setDialogType('shelves');
  };

  const isErrorMessage = verifyResult?.message?.includes('請確認資訊是否正確');
  console.log('isErrorMessage', isErrorMessage);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Dialog
        open={dialogIsOpen}
        maxWidth={dialogType === 'get' ? 'md' : 'sm'}
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
            {dialogType === 'get' && (
              <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <DialogContent sx={{ textAlign: 'center' }}>
                  {!isReceive && (
                    <>
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
                    </>
                  )}

                  {dialogType === 'get' && ticketVcList.length > 0 && (
                    <TestQR oriTicketList={ticketVcList} />
                  )}
                </DialogContent>
              </Box>
            )}

            {(dialogType === 'shelves' || dialogType === 'cancel') && (
              <VPQRNew dialogType={dialogType} oriTicketList={shelvesData} />
            )}
          </Box>
        </Box>

        <DialogActions>
          <Button onClick={() => setDialogIsOpen(false)}>關閉</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: '100%', px: isMobile ? 1 : 4, py: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && (
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
                    找不到訂單編號？請確認您的購票確認信箱
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        {activeStep === 1 && (
          <Box
            sx={{
              minHeight: '100vh',
              bgcolor: '#f5f6fa',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 4,
            }}>
            <Card
              elevation={0}
              sx={{
                width: { xs: '100%', md: '50%' },
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
                    {orderNumber} : 訂單查詢結果
                  </Typography>

                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <TicketOrder
                      ticketAllList={ticketAllList}
                      handleShelves={handleShelves}
                      handleSearchold={handleSearchold}></TicketOrder>

                    {/* <Box px={1}> */}
                    <Button variant="contained" color="primary" onClick={handleReset}>
                      返回查詢頁面
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </>
  );
}
