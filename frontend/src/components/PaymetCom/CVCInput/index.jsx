import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const formatCard = (v) =>
  v
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
function CreditCardInput({ value, onChange }) {
  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = formatCard(digits);
    onChange(formatted);
  };
  return (
    <TextField
      label="信用卡卡號 *"
      value={value}
      onChange={handleChange}
      placeholder="1234 5678 9012 3456"
      slotProps={{
        input: {
          maxLength: 19,
          inputMode: 'numeric',
        },
      }}
      fullWidth
    />
  );
}

const formatExpiry = (v) => {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + '/' + digits.slice(2);
};
function ExpiryInput({ value, onChange }) {
  const handleChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    onChange(formatted);
  };
  return (
    <TextField
      label="有效期限 (MM/YY) *"
      value={value}
      onChange={handleChange}
      placeholder="11/25"
      slotProps={{
        input: {
          maxLength: 5,
          inputMode: 'numeric',
        },
      }}
      fullWidth
    />
  );
}

function CvcInput({ value, onChange }) {
  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
    onChange(digits);
  };
  return (
    <TextField
      label="安全碼 (CVC) *"
      value={value}
      onChange={handleChange}
      placeholder="123"
      slotProps={{
        input: {
          maxLength: 3,
          inputMode: 'numeric',
        },
      }}
      fullWidth
    />
  );
}

export default function CreditCardForm({ card, setCard, expDate, setExpDate, cvc, setCvc }) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <CreditCardInput value={card} onChange={setCard} />
      </Grid>
      <Grid size={12}>
        <ExpiryInput value={expDate} onChange={setExpDate} />
      </Grid>
      <Grid size={12}>
        <CvcInput value={cvc} onChange={setCvc} />
      </Grid>
    </Grid>
  );
}
