'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // 你的 MUI theme 檔案

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
