// ExpiryInput.jsx
import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';

const onlyDigits = (s) => s.replace(/\D/g, '');

const formatExpiry = (digits) => {
  const d = digits.slice(0, 4);
  if (d.length <= 2) return d;
  return d.slice(0, 2) + '/' + d.slice(2);
};

export default function ExpiryInput({
  label = '有效期限 (MM/YY)',
  defaultValue = '',
  onChange,
  ...props
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const input = e.target;
    const raw = input.value;
    const selStart = input.selectionStart ?? raw.length;

    // count digits before cursor
    const digitsBefore = onlyDigits(raw.slice(0, selStart)).length;

    const digits = onlyDigits(raw).slice(0, 4);
    const formatted = formatExpiry(digits);

    // set value
    if (inputRef.current) inputRef.current.value = formatted;
    onChange?.(formatted, digits);

    // compute new cursor pos (position after same count of digits)
    let count = 0,
      newPos = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) count++;
      newPos++;
      if (count >= digitsBefore) break;
    }

    // clamp
    if (digitsBefore === 0) newPos = 0;
    if (newPos > formatted.length) newPos = formatted.length;

    requestAnimationFrame(() => {
      try {
        inputRef.current?.setSelectionRange(newPos, newPos);
      } catch {}
    });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboard = (e.clipboardData || window.clipboardData).getData('text');
    const digits = onlyDigits(clipboard).slice(0, 4);
    const formatted = formatExpiry(digits);
    if (inputRef.current) {
      inputRef.current.value = formatted;
      onChange?.(formatted, digits);
      requestAnimationFrame(() => {
        const pos = formatted.length;
        try {
          inputRef.current.setSelectionRange(pos, pos);
        } catch {}
      });
    }
  };

  const handleKeyDown = (e) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (allowed.includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
    else {
      // prevent beyond 4 digits
      const curDigits = onlyDigits(inputRef.current?.value || '');
      if (curDigits.length >= 4) e.preventDefault();
    }
  };

  return (
    <TextField
      sx={{ display: 'flex', mt: 2 }}
      fullWidth
      inputRef={inputRef}
      label={label}
      defaultValue={defaultValue}
      placeholder="MM/YY"
      inputProps={{ maxLength: 5, inputMode: 'numeric' }}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

// 小工具：檢查有效性（月份 01-12；可擴充為檢查是否過期）
export function isValidExpiry(formatted) {
  if (!formatted || !/^\d{2}\/\d{2}$/.test(formatted)) return false;
  const mm = parseInt(formatted.slice(0, 2), 10);
  return mm >= 1 && mm <= 12;
}
