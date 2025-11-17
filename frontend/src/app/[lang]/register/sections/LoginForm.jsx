'use client';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function LoginForm({ handleRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [checked, setChecked] = useState(false);

  const [memberPw, setMemberPw] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split('/')[1];

  const onRegisterClick = async () => {
    /* let ajaxData = {
      vcUid: '00000000_circlebank001',
      issuanceDate: '20251026',
      expiredDate: '20261026',
      fields: [
        {
          ename: 'memberId',
          content: memberId,
        },
        {
          ename: 'name',
          content: memberId,
        },
      ],
    }; */

    let userData = { memberId: memberId, password: memberPw, isBindingVC: checked };
    handleRegister(userData);
  };

  return (
    <Box>
      <Box display='flex' alignItems='center' gap={1} mb={3}>
        <Box
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#8B5CF6',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
          }}
        >
          <img src='/logoiconv3.svg' className=' w-[32px] h-[32px] object-contain' alt='login' />
        </Box>
        <Typography variant='h6' fontWeight='bold'>
          票票盒
        </Typography>
      </Box>

      <Typography variant='h5' fontWeight='bold' mb={1}>
        建立票票盒會員
      </Typography>

      {/* <TextField
        fullWidth
        label='使用者名稱'
        placeholder='輸入您的使用者名稱'
        type='text'
        margin='normal'
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
      /> */}

      <TextField
        fullWidth
        label='帳號'
        placeholder='輸入您的帳號'
        type='text'
        margin='normal'
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />

      <Box position='relative'>
        <TextField
          fullWidth
          label='密碼'
          placeholder='輸入您的密碼'
          type={showPassword ? 'text' : 'password'}
          margin='normal'
          value={memberPw}
          onChange={(e) => setMemberPw(e.target.value)}
        />
        <IconButton
          size='small'
          onClick={() => setShowPassword((s) => !s)}
          sx={{ position: 'absolute', right: 10, top: 28 }}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>

      <Box display='flex' justifyContent='space-between' alignItems='center' mt={1}>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
          label='是否同步綁定VC'
        />
      </Box>

      <Button
        fullWidth
        variant='contained'
        onClick={onRegisterClick}
        sx={{
          mt: 3,
          py: 1.3,
          fontWeight: 600,
        }}
      >
        註冊
      </Button>
    </Box>
  );
}
