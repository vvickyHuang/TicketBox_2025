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
        p: 1,
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
        {/* <Box sx={{ flex: 1, p: 5 }}>
          <LoginForm />
        </Box>*/}
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
            {/*  <img
              src="/img/login.png"
              className="absolute inset-0 w-full h-full object-contain"
              alt="login"
            /> */}
          </div>
        </Box>
      </Paper>
    </Box>
  );
}
