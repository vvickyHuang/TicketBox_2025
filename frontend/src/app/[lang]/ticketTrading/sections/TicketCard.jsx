import { Box, Card, CardContent, Typography, Button, Chip, Avatar } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SeatIcon from '@mui/icons-material/Chair';

export default function TicketCard({ ticket }) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: 1,
        borderLeft: `6px solid ${ticket.status === 'sell' ? '#F87171' : '#60A5FA'}`,
        backgroundColor:
          ticket.status === 'sell' ? 'rgba(248,113,113,0.05)' : 'rgba(96,165,250,0.05)',
      }}
    >
      <CardContent>
        <Box display='flex' gap={2}>
          <img
            src={ticket.image}
            alt={ticket.title}
            style={{
              width: 100,
              height: 100,
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
          <Box flex={1}>
            <Box display='flex' alignItems='center' gap={1}>
              {ticket.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  size='small'
                  color={i === 0 ? 'error' : 'warning'}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Box>
            <Typography variant='subtitle1' fontWeight='bold' mt={1}>
              {ticket.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <EventIcon fontSize='small' /> {ticket.date}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <LocationOnIcon fontSize='small' /> {ticket.location}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <SeatIcon fontSize='small' /> {ticket.seat}
            </Typography>
            <Box display='flex' alignItems='center' mt={1} gap={1}>
              <Avatar src={ticket.seller.avatar} sx={{ width: 24, height: 24 }} />
              <Typography variant='body2' color='text.secondary'>
                {ticket.seller.name}（信用 {ticket.seller.rating}/5）
              </Typography>
            </Box>
          </Box>
          <Box textAlign='right'>
            <Typography variant='h6' fontWeight='bold' color='error.main'>
              NT$ {ticket.price.toLocaleString()}
            </Typography>

            <Typography variant='caption' color='text.secondary'>
              每張
            </Typography>
            <Box display='flex' justifyContent='flex-end' gap={1} mt={1}>
              <Button variant='outlined' color='error'>
                ❤️ 收藏
              </Button>
              <Button variant='contained' color='error'>
                立即購買
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
