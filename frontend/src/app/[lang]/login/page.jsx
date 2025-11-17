'use client';
import { Box, Paper } from '@mui/material';
import LoginForm from './sections/LoginForm';

export default function LoginPage() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 100%)',
        p: 2.5,
        overflow: 'auto',
      }}>
      <Paper
        elevation={6}
        sx={{
          height: '100%',
          display: 'flex',
          borderRadius: 4,
          overflow: 'hidden',
          maxWidth: 960,
          width: '100%',
        }}>
        <Box
          sx={{
            height: '100%',
            flex: 1,
            p: 5,
          }}>
          <LoginForm />
        </Box>

        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <div className="relative w-full h-full">
            <img
              src="/img/loginv3.png"
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="login"
            />
            <div className="absolute inset-0 bg-purple-400/15"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
              <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">探索精彩演唱會</h2>
              <p className="text-lg opacity-90 mb-1 drop-shadow">感受每一個節拍的力量</p>
              <p className="text-sm opacity-80 drop-shadow">最熱門的藝人演出，最優質的座位選擇</p>
            </div>
          </div>
        </Box>
      </Paper>
    </Box>
  );
}
