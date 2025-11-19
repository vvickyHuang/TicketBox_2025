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
import BubbleTour from '@/components/Tour/BubbleTour';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import VPQRNew from '@/components/VPQRNew';
import TicketOrder from './sections/OrderCard';

import { LuSearch } from 'react-icons/lu';
export default function OrderQueryPage() {
  const isMobile = useIsMobile();

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');

  const [time, setTime] = useState('');
  const [isReceive, setIsReceive] = useState(false);
  const [ticketVcList, setTicketVcList] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [shelvesData, setShelvesData] = useState({});
  const [dialogType, setDialogType] = useState({});
  const steps = ['查詢訂單', '訂單查詢結果'];
  const [tourOpen, setTourOpen] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const handleClickOpen = () => {
    setDialogIsOpen(true);
  };
  const [ticketAllList, setTicketAllList] = useState([]);
  const [stepsTour, setStepsTour] = useState([]);

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
      console.log('all:', ticketAllList);

      const result = data.ticketVcDTOList.map((bItem) => {
        const matched = ticketAllList.find(
          (aItem) =>
            aItem.area === bItem.area && aItem.line === bItem.line && aItem.seat === bItem.seat,
        );

        return {
          ...bItem,
          name: matched ? matched.name : null, // 沒找到就給 null 或保持不動
        };
      });

      console.log('合併後的結果:', result);
      setTicketVcList(result);
      setIsReceive(true);
      return data;
    } catch (err) {
      console.error('addData 失敗:', err);
      return null;
    }
  };

  const handleSearchold = async (type, index) => {
    setDialogType(type);
    handleClickOpen();

    let tour = [
      {
        target: '#sendMail',
        title: '發送驗證信',
        text: '發送驗證信後，請五分鐘內在輸入框輸入收到的驗證碼。',
        position: 'top',
      },
      {
        target: '#verificationBtn',
        title: '驗證',
        text: '點擊此按鈕進行驗證碼驗證，驗證成功後即可取得數位憑證。',
        position: 'top',
      },
    ];
    setStepsTour(tour);
  };

  const sendEmailVerifyCode = async () => {
    let ajaxData = {
      orderId: orderNumber,
      email: email,
    };

    let tour = [
      {
        target: '#ticketQRCode',
        title: '加入數位憑證皮夾 App',
        text: '點擊即可將此票券加入您的數位票券錢包，方便隨時出示。',
        position: 'top',
      },
      {
        target: '#navNext',
        title: '下一張票',
        text: '若您的訂單有多張票，可從這裡切換依序加入皮夾。',
        position: 'bottom',
      },
    ];
    setStepsTour(tour);

    try {
      const verifyResult = await sendVerifyCode(ajaxData);
      setVerifyResult(verifyResult);
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

  const initData = async () => {
    console.log('訂單編號:', orderNumber);
    console.log('信箱:', email);
    let ajaxData = {
      orderId: orderNumber,
      email: email,
    };

    try {
      const allList = await getAllList(ajaxData);
      setTicketAllList(allList);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleShelves = async (type, index) => {
    console.log(index, type);
    setDialogType(type);

    let tour = [
      {
        target: '#ticketQRCode',
        title: '加入數位憑證皮夾 App',
        text:
          ticketAllList[index].vcStatus === 'ACTIVE'
            ? '點擊即可選擇此票券作為販售票券'
            : '點擊即可取消販售此票券',
        position: 'top',
      },
    ];
    setStepsTour(tour);
    const res = await fetch(`/api/trading/ticketTrading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: type === 'shelves' ? 'TRADING' : 'CANCEL',
      }),
    });
    const resData = await res.json();

    resData.line = ticketAllList[index].line;
    resData.seat = ticketAllList[index].seat;
    resData.area = ticketAllList[index].area;
    resData.isScanned = false;
    resData.vcStatus = ticketAllList[index].vcStatus;
    resData.name = ticketAllList[index].name;
    console.log('上架販售結果', resData);
    setShelvesData(resData);
    setDialogIsOpen(true);
    // setDialogType('shelves');
  };

  // const isErrorMessage = verifyResult?.message?.includes('請確認資訊是否正確');
  // console.log('isErrorMessage', isErrorMessage);

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
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                      <Button
                        id="sendMail"
                        variant="contained"
                        onClick={sendEmailVerifyCode}
                        sx={{ mt: 3, py: 1.3, fontWeight: 600 }}>
                        發送驗證信
                      </Button>

                      <Button
                        id="verificationBtn"
                        disabled={!verifyResult?.message}
                        variant="contained"
                        onClick={addData}
                        sx={{ mx: 2, mt: 3, py: 1.3, fontWeight: 600 }}>
                        驗證
                      </Button>
                    </>
                  )}

                  {dialogType === 'get' && ticketVcList.length > 0 && (
                    <TestQR oriTicketList={ticketVcList} handleSearch={initData} />
                  )}
                </DialogContent>
              </Box>
            )}

            {(dialogType === 'shelves' || dialogType === 'cancel') && (
              <VPQRNew
                dialogType={dialogType}
                oriTicketList={shelvesData}
                handleSearch={initData}
              />
            )}
          </Box>
        </Box>

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setTourOpen(true)}>
            <MenuBookIcon />
          </Button>
          <Button onClick={() => setDialogIsOpen(false)}>關閉</Button>
        </DialogActions>
        <BubbleTour open={tourOpen} steps={stepsTour} onClose={() => setTourOpen(false)} />
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
