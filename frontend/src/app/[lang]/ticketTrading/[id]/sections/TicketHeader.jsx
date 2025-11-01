import { Box, Typography, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function TicketHeader({ ticket }) {
  return (
    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
      <img
        src={ticket.image}
        alt={ticket.title}
        style={{ width: '100%', height: 300, objectFit: 'cover' }}
      />
      <Chip
        label='可售'
        color='success'
        size='small'
        sx={{ position: 'absolute', top: 16, left: 16 }}
      />
      <Box sx={{ p: 2 }}>
        <Typography variant='h5' fontWeight='bold' sx={{ mt: 1 }}>
          {ticket.title}
        </Typography>
        <Box display='flex' alignItems='center' gap={2} color='text.secondary' mt={0.5}>
          <EventIcon fontSize='small' /> {ticket.date}
          <AccessTimeIcon fontSize='small' /> {ticket.time}
          <LocationOnIcon fontSize='small' /> {ticket.location}
        </Box>
      </Box>
    </Box>
  );
}
