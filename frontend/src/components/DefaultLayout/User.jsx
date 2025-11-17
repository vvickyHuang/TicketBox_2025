'use client';

import { useState } from 'react';
import { Avatar, Popover, Box, Typography, MenuItem, IconButton, useTheme } from '@mui/material';
import { LuLogOut } from 'react-icons/lu';

// import { useAuthStore } from '@/stores/auth';
import { useAppDispatch, useAppSelector } from '@/lib/store';

export default function ProfileCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.global);

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
    <Box display="flex" justifyContent="center" alignItems="center">
      {/* 頭像按鈕 */}
      <IconButton onClick={handleClick}>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            cursor: 'pointer',
          }}>
          {user.memberName?.charAt(0) || ''}
        </Avatar>
      </IconButton>

      {/* Popover */}
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                bgcolor: theme.palette.grey[700],
                color: theme.palette.grey[50],
              }}>
              <Typography variant="body2">{user.memberName}</Typography>
              {/* <Business size={20} /> */}
            </Box>

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
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  width: 56,
                  height: 56,
                }}>
                {user.memberName?.charAt(0) || ''}
              </Avatar>
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
    </Box>
  );
}
