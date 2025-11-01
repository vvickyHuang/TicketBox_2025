// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B5CF6',
      contrastText: '#FFFFFF',
      dark: '#7C3AED',
      light: '#E9D5FF',
    },
    secondary: {
      main: '#5C5B72', // 次要文字用的灰紫色
    },
    background: {
      default: '#F9F8FF', // 整體背景
      paper: '#FFFFFF', // 卡片與元件底
    },
    text: {
      primary: '#1E1B2E', // 主文字
      secondary: '#5C5B72', // 副文字
      disabled: '#BFA3F5',
    },
    error: {
      main: '#FB7185',
    },
    success: {
      main: '#4ADE80',
    },
    warning: {
      main: '#FACC15',
    },
    info: {
      main: '#38BDF8',
    },
    divider: '#DAD6FF',
  },
  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 16px',
        },
        containedPrimary: {
          backgroundColor: '#8B5CF6',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#7C3AED',
          },
          '&:disabled': {
            backgroundColor: '#E9D5FF',
            color: '#BFA3F5',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #DAD6FF',
        },
      },
    },
  },
});

export default theme;
