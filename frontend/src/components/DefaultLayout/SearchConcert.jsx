import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
  return (
    <TextField
      variant='outlined'
      placeholder='搜尋演唱會'
      size='small'
      sx={{
        width: 250,
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        borderRadius: '12px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(139, 92, 246, 0.4)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#8B5CF6',
            boxShadow: '0 0 6px rgba(139, 92, 246, 0.3)',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon sx={{ color: '#8B5CF6' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
