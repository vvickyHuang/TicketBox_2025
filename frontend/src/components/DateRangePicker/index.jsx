import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography, Box } from '@mui/material';

export default function SingleDatePicker() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-tw">
      <Box>
        <DatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="YYYY/MM/DD"
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
