import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
} from '@mui/material';

export default function TicketOptions({ tickets }) {
  return (
    <Card sx={{ borderRadius: 3, p: 1, position: 'sticky', top: 20 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          選擇票種
        </Typography>
        <Select fullWidth size='small' defaultValue='2024年3月15日 (五) 19:30' sx={{ mb: 3 }}>
          <MenuItem value='2024年3月15日 (五) 19:30'>2024年3月15日 (五) 19:30</MenuItem>
        </Select>

        {tickets.map((t, i) => (
          <Box key={i} sx={{ mb: 3 }}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography fontWeight='bold'>{t.name}</Typography>
              <Typography
                variant='body2'
                sx={{
                  color:
                    t.status === 'limited' ? 'error.main' : t.status === 'few' ? 'orange' : 'green',
                  fontWeight: 600,
                }}
              >
                {t.badge}
              </Typography>
            </Box>
            <Typography color='text.secondary'>{t.desc}</Typography>
            <Typography color='primary' fontWeight='bold' sx={{ mt: 0.5 }}>
              NT$ {t.price.toLocaleString()}
            </Typography>
            <Button fullWidth variant='contained' color='primary' sx={{ mt: 1 }}>
              選擇
            </Button>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />
        <Box display='flex' justifyContent='space-between'>
          <Typography>票價</Typography>
          <Typography>NT$ 0</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography>手續費</Typography>
          <Typography>NT$ 0</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Typography fontWeight='bold'>總計</Typography>
          <Typography color='primary' fontWeight='bold'>
            NT$ 0
          </Typography>
        </Box>
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          sx={{
            mt: 2,
            py: 1.3,
            background: 'linear-gradient(to right, #8b5cf6, #a855f7, #ec4899)',
          }}
        >
          立即購買
        </Button>
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: 'block', textAlign: 'center', mt: 1 }}
        ></Typography>
      </CardContent>
    </Card>
  );
}
