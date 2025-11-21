// theme-dark.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#C084FC', dark: '#7C3AED', light: '#DDD6FE', contrastText: '#09090B' },
    secondary: { main: '#6B648D', light: '#A9A4C5', dark: '#4A436B', contrastText: '#FFF' },
    background: { default: '#09090B', paper: '#18181B', subtle: '#1A1A1A' },
    text: { primary: '#FFF', secondary: '#B0B0B0', disabled: '#555' },
    divider: '#3F3F47',
  },
  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
});

export default darkTheme;
