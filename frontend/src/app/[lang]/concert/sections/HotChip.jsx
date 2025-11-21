'use client';

import Chip from '@mui/material/Chip';
import { styled, useTheme } from '@mui/material/styles';
import { useI18n } from '@/context/i18nContext';

const StyledChip = styled(Chip)(({ theme, status }) => {
  const isHot = status === '熱賣中';
  const isLight = theme.palette.mode === 'light';

  // 背景顏色
  const bgColor = isHot
    ? '#FFC107' // 金黃色
    : isLight
    ? '#A0AEC0' // 灰色亮底
    : '#4A5568'; // 灰色深底

  // 文字顏色
  const textColor = isHot ? '#1E1B2E' : '#FFF';

  // shadow
  const shadowColor = isHot
    ? 'rgba(255, 193, 7, 0.3)'
    : isLight
    ? 'rgba(160, 174, 192, 0.2)'
    : 'rgba(74, 85, 104, 0.3)';

  const hoverBgColor = isHot ? '#FFB300' : bgColor;
  const hoverShadowColor = isHot
    ? 'rgba(255, 193, 7, 0.4)'
    : isLight
    ? 'rgba(160, 174, 192, 0.3)'
    : 'rgba(74, 85, 104, 0.4)';

  return {
    position: 'absolute',
    top: -12,
    left: 16,
    backgroundColor: bgColor,
    color: textColor,
    fontWeight: 600,
    boxShadow: `0 2px 6px ${shadowColor}`,
    transition: 'all 0.25s ease',
    cursor: 'default',
    '&:hover': {
      transform: 'translateY(-2px)',
      backgroundColor: hoverBgColor,
      boxShadow: `0 4px 12px ${hoverShadowColor}`,
    },
  };
});

export default function HotChip({ status }) {
  const theme = useTheme();
  const t = useI18n();

  return <StyledChip status={t.main[status]} label={t.main[status]} />;
}
