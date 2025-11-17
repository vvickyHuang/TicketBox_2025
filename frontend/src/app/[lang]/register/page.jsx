'use client';
import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
import LoginForm from './sections/LoginForm';
import { useState } from 'react';
import QRcode from './sections/QRcode';
import { useRouter, usePathname } from 'next/navigation';
import { addSnackbar } from '@/lib/features/snackbarSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';

export default function LoginPage() {
  const [qrCodeBase64, setQrCodeBase64] = useState('');
  const [qrCodeMsg, setQrCodeMsg] = useState('');

  const [userData, setUserData] = useState();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const lang = pathname.split('/')[1] || 'en';

  const handleRegister = async (userData) => {
    console.log(userData);
    setUserData(userData);
    try {
      const res = await fetch(`/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const result = await res.json();
      if (res.status === 200) {
        dispatch(addSnackbar({ message: result.message, severity: 'success' }));
        if (userData.isBindingVC) {
          const vcLoginRes = await fetch(`/api/vcLogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          const data = await vcLoginRes.json();
          setQrCodeBase64(data.qrCode);
          setQrCodeMsg(data.message);
        }
      } else {
        dispatch(addSnackbar({ message: result.message, severity: 'error' }));
        if (userData.isBindingVC) {
          const vcLoginRes = await fetch(`/api/vcLogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          const data = await vcLoginRes.json();
          setQrCodeBase64(data.qrCode);
          setQrCodeMsg(data.message);
        }
      }
    } catch (error) {
      dispatch(addSnackbar({ message: error, severity: 'error' }));
    }
    // if (res.ok) {
    // const vcLoginRes = await fetch(`/api/vcLogin`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    // });
    // const data = await vcLoginRes.json();
    // setQrCodeBase64(data.qrCode);
    // setQrCodeMsg(data.message);
    // console.log('POSTAPI:', {
    //   transactionId: data.data.transactionId,
    //   memberId: userData.memberId,
    // });
    // }
    // } catch (error) {
    //   console.error('Register error:', error);
    //   alert('登入失敗');
    // }
  };
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          borderRadius: 4,
          overflow: 'hidden',
          maxWidth: qrCodeBase64 ? 400 : 960,
          width: '100%',
        }}
      >
        {qrCodeBase64 ? (
          <Box
            sx={{
              flex: 1,
              p: 1,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <Avatar
              sx={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            >
              {userData?.memberId?.[0]}
            </Avatar>

            <QRcode qrCodeBase64={qrCodeBase64} />

            <Typography textAlign='center' m={2} variant='body2'>
              {qrCodeMsg}
            </Typography>

            <Typography textAlign='center' variant='body2'>
              <Button onClick={() => router.push(`/${lang}/login`)}>返回登入</Button>
            </Typography>
          </Box>
        ) : (
          <Box sx={{ flex: 1, p: 4 }}>
            <LoginForm handleRegister={handleRegister} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
