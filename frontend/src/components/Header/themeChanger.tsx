'use client';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LuMoon } from 'react-icons/lu';
import { LuSunMedium } from 'react-icons/lu';
import Button from '@mui/material/Button';
import { LuEarth } from 'react-icons/lu';

export default function SimpleNavTabs() {
  return (
    <Button
      variant='outlined'
      sx={{
        width: 28,
        height: 28,
        minWidth: 28, // 防止 MUI 默认 minWidth 覆盖
        padding: 0, // 避免图标偏移
      }}
    >
      <LuSunMedium />
    </Button>
  );
}
