'use client';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system';

// 彈跳動畫
const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
`;

export default function BouncingDotsLoading() {
  const [loading, setLoading] = useState(true);

  /* const startQueue = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 8000)); // 模擬排隊
    } finally {
      setLoading(false);
    }
  }; */

  return (
    <>
      {/* <Button variant="contained" onClick={startQueue}>
        嘗試搶票
      </Button> */}

      <Backdrop
        open={loading}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            系統正在排隊
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  animation: `${bounce} 1.2s infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: '#fff',
            }}>
            高峰期間可能需要一些時間
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
