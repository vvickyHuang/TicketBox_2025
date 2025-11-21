'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme, Button, Stack } from '@mui/material';
import { LuMoon, LuSunMedium, LuEarth } from 'react-icons/lu';

import { useColorMode } from '@/app/[lang]/ClientLayout';

export default function DLThemeChanger() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'en';
  const nextLang = currentLang === 'en' ? 'tw' : 'en';

  const handleLanguageToggle = () => {
    const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);
    router.push(newPath);
  };

  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Button
        variant='outlined'
        onClick={colorMode.toggleColorMode}
        sx={{
          width: 36,
          height: 36,
          minWidth: 36,
          padding: 0,
        }}
      >
        {theme.palette.mode === 'light' ? <LuMoon /> : <LuSunMedium />}
      </Button>

      <Button
        variant='outlined'
        onClick={handleLanguageToggle}
        sx={{
          width: 36,
          height: 36,
          minWidth: 36,
          padding: 0,
        }}
        title={`Switch to ${nextLang === 'en' ? 'English' : '中文'}`}
      >
        <LuEarth />
      </Button>
    </Stack>
  );
}
