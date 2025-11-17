'use client';
import { useState } from 'react';

import { LuMoon, LuSunMedium, LuEarth, LuCircleUserRound } from 'react-icons/lu';
import { useColorMode } from '@/app/[lang]/ClientLayout';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  Avatar,
  Popover,
  Box,
  Typography,
  MenuItem,
  IconButton,
  useTheme,
  Button,
  Stack,
} from '@mui/material';
import { LuLogOut } from 'react-icons/lu';

export default function SimpleNavTabs() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.global);
  // console.log(user);
  const currentLang = pathname.split('/')[1] || 'en';
  const nextLang = currentLang === 'en' ? 'tw' : 'en';

  const handleLanguageToggle = () => {
    const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);
    router.push(newPath);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    // authStore.logout();
    handleClose();
  };

  const open = Boolean(anchorEl);
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        variant="outlined"
        onClick={colorMode.toggleColorMode}
        sx={{
          width: 36,
          height: 36,
          minWidth: 36,
          padding: 0,
        }}>
        {theme.palette.mode === 'light' ? <LuMoon /> : <LuSunMedium />}
      </Button>

      <Button
        variant="outlined"
        onClick={handleLanguageToggle}
        sx={{
          width: 36,
          height: 36,
          minWidth: 36,
          padding: 0,
        }}
        title={`Switch to ${nextLang === 'en' ? 'English' : '中文'}`}>
        <LuEarth />
      </Button>
      {/* {user?.memberName === '' ? (
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.3,
            fontWeight: 600,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            boxShadow: '0 3px 10px rgba(139, 92, 246, 0.3)',
            '&:hover': {
              boxShadow: '0 5px 15px rgba(139, 92, 246, 0.5)',
            },
          }}
          onClick={() => router.push(`/${currentLang}/login`)}>
          會員登入
        </Button>
      ) : (
        <button
          onClick={handleClick}
          className="w-[38px] h-[38px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition">
          {user.memberName?.charAt(0).toUpperCase()}
        </button>
      )} */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Box
          sx={{
            p: 2,
            width: '20rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
          {/* Profile Card */}
          <Box
            sx={{
              borderRadius: 3,
              boxShadow: '0 0 10px rgba(0,0,0,0.15)',
              overflow: 'hidden',
            }}>
            {/* Header */}

            {/* Content */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 3,
                bgcolor: theme.palette.background.paper,
              }}>
              <button className="w-[38px] h-[38px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition">
                {user.memberName?.charAt(0).toUpperCase()}
              </button>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {user.memberName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.memberName}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Menu List */}

          <MenuItem
            onClick={() => router.push(`/${currentLang}/user`)}
            sx={{
              borderRadius: 2,
              display: 'flex',
              gap: 1,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}>
            <LuCircleUserRound size={20} />
            會員中心
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              display: 'flex',
              gap: 1,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}>
            <LuLogOut size={20} />
            登出
          </MenuItem>
        </Box>
      </Popover>
      {/* <Avatar>{user.memberId}</Avatar> */}
    </Stack>
  );
}
