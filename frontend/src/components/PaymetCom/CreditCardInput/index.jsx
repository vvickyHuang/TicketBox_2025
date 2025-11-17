// CreditCardInput.jsx
import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';

/**
 * Format digits into groups of 4 separated by spaces:
 * "4242424242424242" => "4242 4242 4242 4242"
 */
const formatCardNumber = (digits) => {
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const onlyDigits = (s) => s.replace(/\D+/g, '');

export default function CreditCardInput({ value = '', onChange, label = '信用卡號', ...props }) {
  // value: formatted value (with spaces). onChange: (formattedValue, rawDigits) => void
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const input = e.target;
    const raw = input.value;
    const selectionStart = input.selectionStart ?? raw.length;

    // Count digits before cursor to preserve caret position
    const digitsBeforeCursor = onlyDigits(raw.slice(0, selectionStart)).length;

    // Keep only digits then format
    const digits = onlyDigits(raw);
    const formatted = formatCardNumber(digits);

    // Calculate new cursor pos: place after same number of digits
    // find index in formatted string where digitsBeforeCursor digits are consumed
    let newCursor = formatted.length;
    if (digitsBeforeCursor === 0) {
      newCursor = 0;
    } else {
      let count = 0;
      newCursor = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) count++;
        newCursor++;
        if (count >= digitsBeforeCursor) break;
      }
    }

    // call external change handler if provided
    onChange?.(formatted, digits);

    // update input value AND restore cursor afterwards
    // Note: setSelectionRange must run after DOM update — use requestAnimationFrame
    if (inputRef.current) {
      inputRef.current.value = formatted;
      requestAnimationFrame(() => {
        try {
          inputRef.current.setSelectionRange(newCursor, newCursor);
        } catch (err) {
          // ignore if unable to set selection
        }
      });
    }
  };

  const handlePaste = (e) => {
    // allow paste of digits only: filter out non-digits
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    const digits = onlyDigits(text);
    const formatted = formatCardNumber(digits);

    // set value and call onChange
    if (inputRef.current) {
      inputRef.current.value = formatted;
      onChange?.(formatted, digits);
      // move cursor to end of pasted digits
      requestAnimationFrame(() => {
        const pos = formatted.length;
        try {
          inputRef.current.setSelectionRange(pos, pos);
        } catch {}
      });
    }
  };

  const handleKeyDown = (e) => {
    // allow navigation / control keys; otherwise block non-digit input
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (allowedKeys.includes(e.key)) return;
    // allow ctrl/cmd combos
    if (e.ctrlKey || e.metaKey) return;
    // digits only
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    } else {
      // optional: prevent typing beyond 16 digits
      const currentDigits = onlyDigits(inputRef.current?.value || '');
      if (currentDigits.length >= 16) {
        e.preventDefault();
      }
    }
  };

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      label={label}
      defaultValue={value}
      placeholder="4242 4242 4242 4242"
      inputProps={{
        maxLength: 19, // 16 digits + 3 spaces
        inputMode: 'numeric',
        pattern: '\\d*',
        autoComplete: 'cc-number',
      }}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}
