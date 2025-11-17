import { Box, Typography, Paper } from '@mui/material';

export default function RelatedTickets() {
  const related = [
    { title: 'VIP B區 第5排', price: 6800 },
    { title: '搖滾區 前排', price: 4500 },
  ];

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant='h6' gutterBottom>
        相似票券
      </Typography>
      {related.map((r, i) => (
        <Box key={i} display='flex' justifyContent='space-between' mb={1}>
          <Typography>{r.title}</Typography>
          <Typography color='text.secondary'>NT$ {r.price.toLocaleString()}</Typography>
        </Box>
      ))}
    </Paper>
  );
}
