'use client';
import { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function SimpleNavTabs({ items = [], onSelect }) {
  const theme = useTheme();
  const [tabItems, setTabItems] = useState(items);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]); // 儲存每個 tab 的 ref

  const activeIndex = tabItems.findIndex((item) => item.isActive);

  // 點擊切換
  const handleClick = (clickedKey) => {
    const updated = tabItems.map((item) => ({
      ...item,
      isActive: item.key === clickedKey,
    }));
    setTabItems(updated);
    onSelect?.(updated);
  };

  // 🔹 每次 active 改變時，根據實際 DOM 位置更新滑塊
  useEffect(() => {
    if (activeIndex !== -1 && tabRefs.current[activeIndex]) {
      const el = tabRefs.current[activeIndex];
      const { offsetLeft, offsetWidth } = el;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex, tabItems]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 999,
        px: 1,
        py: 0.5,
        boxShadow: `inset 0 0 0 1px ${theme.palette.divider}`,
        overflow: 'hidden',
      }}>
      {/* 🔹 滑動背景指示器 */}
      <motion.div
        animate={indicatorStyle}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          borderRadius: 999,
          backgroundColor: theme.palette.primary.light,
          zIndex: 0,
        }}
      />

      {/* 🔹 tab 按鈕 */}
      {tabItems.map((item, index) => (
        <Typography
          ref={(el) => (tabRefs.current[index] = el)}
          key={item.key}
          onClick={() => handleClick(item.key)}
          variant="body2"
          sx={{
            cursor: 'pointer',
            px: 2.5,
            py: 0.6,
            borderRadius: 999,
            fontWeight: item.isActive ? 700 : 500,
            color: item.isActive ? theme.palette.primary.main : theme.palette.text.primary,
            position: 'relative',
            zIndex: 1,
            userSelect: 'none',
            transition: 'color 0.25s ease',
          }}>
          {item.label}
        </Typography>
      ))}
    </Box>
  );
}
