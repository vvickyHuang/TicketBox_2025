import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import BubbleStep from './BubbleStep';

const Mask = styled('div')({
  position: 'fixed',
  inset: 0,
  // background: 'rgba(0,0,0,0.45)',
  // backdropFilter: 'blur(2px)',
  zIndex: 9990,
});

const StepDots = styled('div')({
  position: 'fixed',
  bottom: 40,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 10000,
});

const Dot = styled('div')(({ active }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  margin: '0 6px',
  background: active ? '#6A4DFF' : '#ccc',
}));

export default function BubbleTour({ open, steps, onClose }) {
  const [index, setIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = document.querySelector(steps[index].target);
    setAnchorEl(el);
  }, [index, open, steps]);

  if (!open) return null;

  const step = steps[index];

  return (
    <>
      <Mask onClick={onClose} />

      <BubbleStep
        open={open}
        anchorEl={anchorEl}
        placement={step.position || 'top'}
        title={step.title}
        text={step.text}
      >
        {/* buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          {index > 0 && (
            <button
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 8,
                border: '1px solid #ccc',
                background: '#f5f5f5',
              }}
              onClick={() => setIndex(index - 1)}
            >
              上一步
            </button>
          )}
          <button
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 8,
              background: '#6A4DFF',
              color: '#fff',
              border: 'none',
            }}
            onClick={() => (index === steps.length - 1 ? onClose() : setIndex(index + 1))}
          >
            {index === steps.length - 1 ? '完成' : '下一步'}
          </button>
        </div>
      </BubbleStep>

      <StepDots>
        {steps.map((_, i) => (
          <Dot key={i} active={i === index} />
        ))}
      </StepDots>
    </>
  );
}
