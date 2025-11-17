import { Box, Typography, Chip, Paper } from '@mui/material';

export default function TicketFeatures({ ticket }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant='h6' gutterBottom>
        場館座位圖
      </Typography>
      <img
        src={ticket.venueImage}
        alt='Venue Map'
        style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
      />

      <Typography variant='h6' gutterBottom>
        票券特色
      </Typography>
      <Box display='flex' gap={1} flexWrap='wrap'>
        {ticket.features.map((f, i) => (
          <Chip key={i} label={f} color='success' variant='outlined' />
        ))}
      </Box>
    </Paper>
  );
}
