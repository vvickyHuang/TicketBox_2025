'use client';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import baseTheme from '../theme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ClientLayout({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) setMode(savedMode);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  // 以 baseTheme 為基底，只改 mode
  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode,
          background:
            mode === 'light'
              ? baseTheme.palette.background
              : {
                  default: '#121212',
                  paper: '#1E1E1E',
                },
          text:
            mode === 'light'
              ? baseTheme.palette.text
              : {
                  primary: '#FFFFFF',
                  secondary: '#B0B0B0',
                },
        },
      }),
    [mode],
  );

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
