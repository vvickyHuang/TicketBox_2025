import React from 'react';
import { styled } from '@mui/system';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';

const Arrow = styled('span')(({ placement }) => ({
  position: 'absolute',
  width: 0,
  height: 0,
  ...(placement === 'top' && {
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '10px solid #fff',
  }),
  ...(placement === 'bottom' && {
    top: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '10px solid #fff',
  }),
}));

export default function BubbleStep({ anchorEl, placement = 'top', title, text, children, open }) {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      modifiers={[
        {
          name: 'offset',
          options: { offset: [0, 10] }, // 氣泡距離目標 10px
        },
      ]}
      sx={{ zIndex: 9999 }}
    >
      <Paper
        sx={{
          padding: '16px',
          width: 260,
          borderRadius: '12px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <Arrow placement={placement} />

        <strong>{title}</strong>
        <p style={{ fontSize: 14, marginTop: 4 }}>{text}</p>

        <div style={{ marginTop: 12 }}>{children}</div>
      </Paper>
    </Popper>
  );
}
