import { Box, Typography, Paper } from '@mui/material';

export default function SeatInfo({ ticket }) {
  const seat = ticket.seatInfo;
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant='h6' gutterBottom>
        座位資訊
      </Typography>
      <Typography>區域：{seat.area}</Typography>
      <Typography>排數：{seat.row}</Typography>
      <Typography>座位號：{seat.number}</Typography>
      <Typography>數量：{seat.count} 張</Typography>
    </Paper>
  );
}
