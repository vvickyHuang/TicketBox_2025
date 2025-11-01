'use client';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

export default function SimpleNavTabs({ items = [], defaultActive = 0, onSelect }) {
  const [active, setActive] = useState(defaultActive);

  const handleClick = (index) => {
    setActive(index);
    if (onSelect) onSelect(items[index]);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 999,
        px: 2,
        py: 0.6,
        gap: 2,
        boxShadow: 'inset 0 0 0 1px #E2E8F0',
      }}
    >
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <Typography
            key={index}
            onClick={() => handleClick(index)}
            variant='body2'
            sx={{
              cursor: 'pointer',
              px: 2.5,
              py: 0.6,
              borderRadius: 999,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#1D4ED8' : '#111827',
              backgroundColor: isActive ? '#E2E8F0' : 'transparent',
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: '#E2E8F0',
              },
            }}
          >
            {item}
          </Typography>
        );
      })}
    </Box>
  );
}
