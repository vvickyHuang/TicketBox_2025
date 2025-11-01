import { Box, Typography, Paper, Divider } from '@mui/material';

export default function PriceInfo({ ticket }) {
  const { price } = ticket;
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant='h6' gutterBottom>
        價格資訊
      </Typography>
      <Box display='flex' justifyContent='space-between'>
        <Typography color='text.secondary'>原價</Typography>
        <Typography>NT$ {price.original.toLocaleString()}</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography color='text.secondary'>售價</Typography>
        <Typography color='primary' fontWeight='bold'>
          NT$ {price.sale.toLocaleString()}
        </Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography color='text.secondary'>手續費</Typography>
        <Typography>NT$ {price.fee}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box display='flex' justifyContent='space-between'>
        <Typography fontWeight='bold'>總計</Typography>
        <Typography fontWeight='bold' color='primary.main'>
          NT$ {price.total.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
