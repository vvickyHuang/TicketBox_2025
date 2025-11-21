'use client';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import ThemeChanger from './ThemeChanger';
import SegmentedNav from '@/components/SegmentedNav';

// Styled Components
const HeaderRoot = styled('header')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 50,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 4),
  },
}));

const RightActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: 0,
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1),
  },
}));

const LogoImage = styled('img')({
  cursor: 'pointer',
  maxWidth: 120,
  height: 'auto',
  objectFit: 'contain',
});

export default function PortalHeader({ lang }) {
  const router = useRouter();
  const theme = useTheme();
  const logoSrc = theme.palette.mode === 'light' ? '/img/logo.svg' : '/img/logodark.svg';

  return (
    <HeaderRoot>
      <HeaderContainer>
        <LogoImage src={logoSrc} alt='logo' onClick={() => router.push(`/${lang}/concert`)} />
        <RightActions>
          <ThemeChanger />
          <SegmentedNav sx={{ display: { xs: 'none', sm: 'flex' } }} />
        </RightActions>
      </HeaderContainer>
    </HeaderRoot>
  );
}
