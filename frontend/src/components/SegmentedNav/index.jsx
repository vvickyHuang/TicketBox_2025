'use client';

import { ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { label: '活動', value: 'concert', href: '/concert' },
  { label: '票卷交易', value: 'ticketTrading', href: '/ticketTrading' },
];
export default function SegmentedNav() {
  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|tw)/, '') || '/';
  const lang = pathname.split('/')[1];
  const current = routes.find((r) => r.href === cleanPath)?.value ?? '';

  const theme = useTheme();

  return (
    <div className='flex gap-4 h-10'>
      <ToggleButtonGroup
        value={current}
        exclusive
        aria-label='Navigation Segmented Control'
        sx={{
          borderRadius: '12px',
          backgroundColor: theme.palette.primary.light, // ex: #E9D5FF
          p: 0.5,
          '& .MuiToggleButton-root': {
            border: 'none',
            textTransform: 'none',
            borderRadius: '10px',
            px: 2,
            fontWeight: 500,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          },
          '& .MuiToggleButton-root.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: `0 2px 4px ${theme.palette.primary.main}55`,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        }}
      >
        {routes.map((route) => (
          <ToggleButton
            key={route.value}
            value={route.value}
            component={Link}
            href={`/${lang}${route.href}`}
          >
            {route.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
