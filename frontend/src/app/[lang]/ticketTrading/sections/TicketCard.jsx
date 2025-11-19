import { Box, Card, CardContent, Typography, Button, Chip, Avatar, Divider } from '@mui/material';
// import EventIcon from '@mui/icons-material/Event';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SeatIcon from '@mui/icons-material/Chair';
import { LuCalendarDays, LuTimer, LuMapPin, LuTicket, LuPlus, LuArmchair } from 'react-icons/lu';
import { useRouter, usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import { setBuyInfo } from '@/lib/features/globalSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';

export default function TicketCard({ ticket }) {
  const params = useParams();
  const id = params.id;
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split('/')[1] || 'en';
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: 1,
        borderLeft: {
          xs: 'none',
          sm: `6px solid ${ticket.status === 'sell' ? '#F87171' : '#60A5FA'}`,
        },
        borderTop: {
          xs: `6px solid ${ticket.status === 'sell' ? '#F87171' : '#60A5FA'}`,
          sm: 'none',
        },
        backgroundColor:
          ticket.status === 'sell' ? 'rgba(248,113,113,0.05)' : 'rgba(96,165,250,0.05)',
      }}>
      <CardContent>
        {/* 上半部：圖片 + 基本資訊 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 2, sm: 2 },
          }}>
          {/* 圖片區 */}
          <Box
            sx={{
              width: { xs: '100%', sm: 250 },
              borderRadius: 2,
              overflow: 'hidden',
            }}>
            <img
              src={ticket.image}
              alt={ticket.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* 票券資訊區 */}
          <Box flex={1} width="100%">
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
              {ticket.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  color={tag === '售票' ? 'error' : 'warning'}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" mt={1}>
              {ticket.title}
            </Typography>

            <Box gap={0.5} sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
              <Typography
                display="flex"
                alignItems="center"
                gap={1}
                variant="body2"
                color="text.secondary">
                <LuCalendarDays size={18} /> {ticket.date}
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                gap={1}
                variant="body2"
                color="text.secondary">
                <LuMapPin size={18} /> {ticket.location}
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                gap={1}
                variant="body2"
                color="text.secondary">
                <LuArmchair size={18} /> {ticket.seat}
              </Typography>
            </Box>
          </Box>

          {/* 價格區 */}
          <Box
            sx={{
              textAlign: { xs: 'left', sm: 'right' },
              width: { xs: '100%', sm: 'auto' },
              mt: { xs: 1, sm: 0 },
            }}>
            <Typography variant="h6" fontWeight="bold">
              NT$ {ticket.price.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 1.5, sm: 2 },
          }}>
          <Box width={{ xs: '100%', sm: 'auto' }}>
            <Button
              fullWidth={{ xs: true, sm: false }}
              variant="contained"
              color="primary"
              onClick={() => {
                router.push(`/${lang}/sellPayment`);
                dispatch(
                  setBuyInfo({
                    concertInfo: ticket,
                    ticketList: ticket.ticketList,
                  }),
                );
              }}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                py: 1,
                fontWeight: 600,
              }}>
              立即購買
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
