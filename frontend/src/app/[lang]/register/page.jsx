'use client';
import { Box, Paper, Avatar, Typography } from '@mui/material';
import LoginForm from './sections/LoginForm';
import { useState } from 'react';
import QRcode from './sections/QRcode';

export default function LoginPage() {
  const [qrCodeBase64, setQrCodeBase64] = useState('a');
  const [userData, setUserData] = useState({ memberName: 'hihih' });
  const handleRegister = async (userData, ajaxData) => {
    console.log(userData, ajaxData);
    setUserData(userData);
    try {
      const res = await fetch(`/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        try {
          const res = await fetch(`/api/vcLogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ajaxData),
          });
          const data = await res.json();
          setQrCodeBase64(data.data.qrCode);
          console.log('POSTAPI:', {
            transactionId: data.data.transactionId,
            memberId: memberId,
          });

          if (res.ok) {
            console.log(res);
            // router.push(`/${lang}/login`);
          } else {
            const data = await res.json();
            alert(data.error || '失敗');
          }
        } catch (error) {
          alert('失敗');
        }
      } else {
        const data = await res.json();
        alert(data.error || '登入失敗');
      }
    } catch (error) {
      alert('登入失敗');
    }
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
      }}>
      {/* <Paper
        elevation={6}
        sx={{
          display: 'flex',
          borderRadius: 4,
          overflow: 'hidden',
          maxWidth: 960,
          width: '100%',
        }}>
        {qrCodeBase64 ? (
          <Box sx={{ flex: 1, p: 1 }}>
            <QRcode qrCodeBase64={qrCodeBase64} />
          </Box>
        ) : (
          <Box sx={{ flex: 1, p: 4 }}>
            <LoginForm handleRegister={handleRegister} />
          </Box>
        )}
      </Paper> */}
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          borderRadius: 4,
          overflow: 'hidden',
          maxWidth: qrCodeBase64 ? 400 : 960,
          width: '100%',
        }}>
        {qrCodeBase64 ? (
          <Box
            sx={{
              flex: 1,
              p: 1,
              position: 'relative', // ✅ 這行很重要
              display: 'inline-block', // 可選，看你想要 Box 大小
            }}>
            <Avatar
              sx={{
                position: 'absolute',
                top: '12px', // 往上壓
                left: '50%', // 水平中心點
                transform: 'translateX(-50%)', // 使真正水平置中
                zIndex: 1,
              }}>
              {userData?.memberName?.[0]}
            </Avatar>

            <QRcode qrCodeBase64={qrCodeBase64} />

            <Typography textAlign="center" mt={3} variant="body2">
              掃描完成{' '}
              <Typography
                component="span"
                color="primary"
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                onClick={() => router.push(`/${lang}/login`)}>
                返回登入
              </Typography>
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
