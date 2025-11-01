import { Card, CardMedia, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChairIcon from '@mui/icons-material/Chair';

export default function TicketCard({ ticket }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        transition: 'all 0.25s ease',
        position: 'relative',
        backgroundColor: '#fff',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* 封面圖 */}

      <Card
        sx={{
          width: 280, // 👈 固定寬度
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 180,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f3f3f3',
          }}
        >
          <CardMedia
            component='img'
            image={ticket.image}
            alt={ticket.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Card>

      {/* 內容 */}
      <CardContent sx={{ p: 2.5 }}>
        <Chip
          label={ticket.status}
          size='small'
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontSize: 12,
            color: '#fff',
            backgroundColor:
              ticket.status === '即將到來'
                ? '#16A34A' // 綠
                : ticket.status === '已結束'
                ? '#A0AEC0' // 灰
                : '#7B61FF', // 預設紫
          }}
        />
        {/* 標題 */}
        <Typography
          variant='subtitle1'
          fontWeight='bold'
          sx={{
            mb: 1,
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={ticket.title}
        >
          {ticket.title}
        </Typography>

        {/* 活動資訊 */}
        <Typography variant='body2' color='text.secondary' sx={{ mb: 0.3 }}>
          📅 {ticket.date}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 0.3 }}>
          📍 {ticket.location}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          🎟️ {ticket.seat}
        </Typography>

        {/* 價格 + 按鈕 */}
        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mt: 1 }}>
          <Typography
            fontWeight='bold'
            sx={{
              color: '#7B61FF',
              fontSize: '1rem',
            }}
          >
            NT$ {ticket.price.toLocaleString()}
          </Typography>
          <Button
            size='small'
            variant='contained'
            sx={{
              backgroundColor: '#7B61FF',
              borderRadius: 2,
              px: 2,
              textTransform: 'none',
              fontSize: 14,
              '&:hover': { backgroundColor: '#6A4FE0' },
            }}
          >
            查看詳情
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
