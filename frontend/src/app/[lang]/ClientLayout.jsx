'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createContext, useContext, useState, useEffect } from 'react';
import lightTheme from '@/app/theme-light';
import darkTheme from '@/app/theme-dark';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ClientLayout({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) setMode(savedMode);
  }, []);

  const colorMode = {
    toggleColorMode: () => {
      setMode((prev) => {
        const newMode = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newMode);
        return newMode;
      });
    },
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}
