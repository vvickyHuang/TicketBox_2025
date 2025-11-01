import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function EventHeader() {
  return (
    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
      <img
        src='/img/event1.jpg'
        alt='Taylor Swift The Eras Tour'
        style={{ width: '100%', height: 'auto' }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(6px)',
          color: 'white',
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.7))',
          color: 'white',
          p: 3,
        }}
      >
        <Typography variant='h5' fontWeight='bold'>
          Taylor Swift | The Eras Tour
        </Typography>
        <Typography variant='subtitle1'>台北小巨蛋</Typography>
      </Box>
    </Box>
  );
}
