'use client';

import { useState } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  IconButton,
  Dialog,
  List,
  ListItemButton,
  ListItemText,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { label: '活動', value: 'concert', href: '/concert' },
  { label: '票券交易', value: 'ticketTrading', href: '/ticketTrading' },
  { label: '訂單查詢', value: 'orderInquiry', href: '/orderInquiry' },
  { label: '常見問題', value: 'faq', href: '/faq' },
];

// Slide 從上往下動畫
const Transition = (props) => <Slide direction="down" {...props} />;

export default function SegmentedNav() {
  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|tw)/, '') || '/';
  const lang = pathname.split('/')[1];
  const current = routes.find((r) => r.href === cleanPath)?.value ?? '';

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 relative">
      {/* 桌面分段選單 */}
      <div className="hidden sm:flex h-10">
        <ToggleButtonGroup
          value={current}
          exclusive
          aria-label="Navigation Segmented Control"
          sx={{
            borderRadius: '12px',
            backgroundColor: theme.palette.primary.light,
            p: 0.5,
            gap: 1,
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
          }}>
          {routes.map((route) => (
            <ToggleButton
              key={route.value}
              value={route.value}
              component={Link}
              href={`/${lang}${route.href}`}>
              {route.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {/* 手機漢堡選單 */}
      <div className="sm:hidden">
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>

        {/* Dialog 全屏 */}
        <Dialog
          fullScreen
          open={open}
          onClose={() => setOpen(false)}
          TransitionComponent={Transition}>
          {/* 右上角 X 按鈕 */}
          <div className="flex justify-end p-4">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* 選單列表 */}
          <List className="flex flex-col items-center">
            {routes.map((route) => (
              <ListItemButton
                key={route.value}
                component={Link}
                href={`/${lang}${route.href}`}
                onClick={() => setOpen(false)}
                selected={current === route.value}
                sx={{ justifyContent: 'center', py: 3 }}>
                <ListItemText
                  primary={route.label}
                  primaryTypographyProps={{ variant: 'h5', align: 'center' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Dialog>
      </div>
    </div>
  );
}
