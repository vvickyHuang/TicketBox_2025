'use client';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function PaymentLoadingExample() {
  const [loading, setLoading] = useState(true);

  /* const handlePayment = async () => {
    setLoading(true);
    try {
      // 模擬付款 API
      await new Promise((res) => setTimeout(res, 3000));
      alert('付款成功！');
    } catch (err) {
      alert('付款失敗！');
    } finally {
      setLoading(false);
    }
  }; */

  return (
    <>
      {/* <Button variant="contained" color="primary" onClick={handlePayment}>
        付款
      </Button> */}

      <Backdrop
        open={loading}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
        }}>
        <CircularProgress color="inherit" size={80} />
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#fff',
            textShadow: '0 0 6px rgba(0,0,0,0.5)',
          }}>
          付款中…
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: '#fff', // 白色
            // fontWeight: 500,
          }}>
          請勿關閉或返回
        </Typography>
      </Backdrop>
    </>
  );
}
