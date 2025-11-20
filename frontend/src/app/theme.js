import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B5CF6',
      dark: '#7C3AED',
      light: '#DDD6FE',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6B648D',
      light: '#A9A4C5',
      dark: '#4A436B',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9F8FF',
      paper: '#FFFFFF',
      subtle: '#F3F0FF',
    },
    text: {
      primary: '#1E1B2E',
      secondary: '#5C5B72',
      disabled: '#BFA3F5',
    },
    error: { main: '#FB7185' },
    success: { main: '#4ADE80' },
    warning: { main: '#FACC15' },
    info: { main: '#38BDF8' },
    divider: '#E4E0FA',
  },
  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
    h5: { fontWeight: 700, color: '#1E1B2E' },
    subtitle1: { fontWeight: 500, color: '#5C5B72' },
    body2: { color: '#6B688C' },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 18px',
          fontWeight: 600,
          transition: 'all 0.25s ease',
        },
        containedPrimary: {
          backgroundColor: '#8B5CF6',
          color: '#FFF',
          boxShadow: '0 3px 6px rgba(139,92,246,0.2)',
          '&:hover': {
            backgroundColor: '#7C3AED',
            boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
          },
          '&:disabled': {
            backgroundColor: '#EDE9FE',
            color: '#BFA3F5',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #E4E0FA',
          boxShadow: '0 3px 8px rgba(0,0,0,0.03)',
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
