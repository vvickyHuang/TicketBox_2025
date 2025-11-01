import { Box, Typography, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function VenueInfo() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h6' gutterBottom>
        場地資訊
      </Typography>
      <Typography fontWeight='bold'>台北小巨蛋</Typography>
      <Typography color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOnIcon fontSize='small' />
        台北市松山區南京東路四段2號
      </Typography>
      <Link href='#' underline='hover' color='primary' sx={{ mt: 1, display: 'inline-block' }}>
        查看地圖
      </Link>
    </Box>
  );
}
