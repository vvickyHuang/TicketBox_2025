// theme-light.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8B5CF6', dark: '#7C3AED', light: '#DDD6FE', contrastText: '#FFF' },
    secondary: { main: '#6B648D', light: '#A9A4C5', dark: '#4A436B', contrastText: '#FFF' },
    background: { default: '#F9F8FF', paper: '#FFF', subtle: '#F3F0FF' },
    text: { primary: '#1E1B2E', secondary: '#5C5B72', disabled: '#BFA3F5' },
    divider: '#E4E0FA',
  },
  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
});

export default lightTheme;
