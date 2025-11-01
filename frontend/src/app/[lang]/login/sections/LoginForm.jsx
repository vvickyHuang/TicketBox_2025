'use client';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId: memberId, memberPw: memberPw }),
      });

      if (res.ok) {
        router.push(`/${lang}/concert`);

        /* try {
          const res = await fetch(`/api/vcLogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ajaxData),
          });

          const data = await res.json();
          console.log('POSTAPI:', {
            transactionId: data.transactionId,
            memberId: memberId,
          });

          if (res.ok) {
            console.log(res);
            // router.push(`/${lang}/concert`);
          } else {
            const data = await res.json();
            alert(data.error || '失敗');
          }
        } catch (error) {
          alert('失敗');
        } */
      } else {
        const data = await res.json();
        alert(data.error || '登入失敗');
      }
    } catch (error) {
      alert('登入失敗');
    }
  };
  return (
    <Box className="flex flex-col gap-6 h-full mb-3">
      <Box>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#3B82F6',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
            }}>
            ⚡
          </Box>
          <Typography variant="h6" fontWeight="bold">
            票票盒
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold" mb={1}>
          歡迎回來
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          請登入您的帳戶以繼續
        </Typography>

        <TextField
          fullWidth
          label="帳號"
          placeholder="輸入您的帳號"
          type="text"
          margin="normal"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
        <Box position="relative">
          <TextField
            fullWidth
            label="密碼"
            placeholder="輸入您的密碼"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={memberPw}
            onChange={(e) => setMemberPw(e.target.value)}
          />
          <IconButton
            size="small"
            onClick={() => setShowPassword((s) => !s)}
            sx={{ position: 'absolute', right: 10, top: 28 }}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Box>

        {/* <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <FormControlLabel control={<Checkbox />} label="記住我" />
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
          忘記密碼？
        </Typography>
      </Box> */}

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.3,
            backgroundColor: '#4F46E5',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { backgroundColor: '#4338CA' },
          }}
          onClick={handleLogin}>
          登入
        </Button>

        <Typography textAlign="center" mt={3} variant="body2">
          還沒有帳戶？{' '}
          <Typography
            component="span"
            color="primary"
            sx={{ fontWeight: 600, cursor: 'pointer' }}
            onClick={() => router.push(`/${lang}/register`)}>
            立即註冊
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
