'use client';
import { Box, Typography, Button, Divider, Chip } from '@mui/material';
import { styled } from '@mui/system';

const TicketCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #ede7f6 0%, #f8f5ff 100%)',
  borderRadius: '20px',
  padding: '20px 28px',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 6px 14px rgba(156, 39, 176, 0.15), 0 2px 4px rgba(0,0,0,0.05)',
  color: '#333',
  overflow: 'hidden',

  // 缺角
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: '26px',
    height: '26px',
    background: '#f6f4fb',
    borderRadius: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  },
  '&::before': { left: '-13px' },
  '&::after': { right: '-13px' },

  // 模擬撕線
  '& .dotted-line': {
    // position: 'absolute',
    top: 0,
    bottom: 0,
    // left: '62%',
    width: '1px',
    borderLeft: '2px dashed rgba(156,39,176,0.3)',
    zIndex: 1,
    height: '100%',
    margin: '0 12px',
  },
}));

const InfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  zIndex: 3,
});

export default function TicketOrder({ ticketAllList, handleShelves, handleSearchold }) {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt={4} gap={2}>
      {ticketAllList?.map((ticket, index) => (
        <TicketCard key={index}>
          <InfoBox>
            <Typography variant='body1' fontWeight={700}>
              {/* {ticket.event} */}
              BTS PERMISSION TO DANCE ON STAGE - TAIPEI
            </Typography>

            <Typography variant='body2'>姓名：{ticket.name}</Typography>
            <Typography variant='body2'>信箱：{ticket.email}</Typography>
            <Typography variant='body2'>
              座位：{ticket.area} - {ticket.line}排{ticket.seat}號
            </Typography>
          </InfoBox>
          <span className='dotted-line' />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',

              minWidth: 100,
              zIndex: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Chip
                sx={{ mb: 1 }}
                label={
                  ticket.vcStatus === 'PENDING'
                    ? '未取票'
                    : ticket.vcStatus === 'TRADING'
                    ? '票券販售中'
                    : ticket.vcStatus === 'ACTIVE'
                    ? '已領票'
                    : ticket.vcStatus === 'REVOKED'
                    ? '票券已撤銷'
                    : `其他狀態：${ticket.vcStatus}`
                }
                color={
                  ticket.vcStatus === 'PENDING'
                    ? 'warning'
                    : ticket.vcStatus === 'TRADING'
                    ? 'info'
                    : ticket.vcStatus === 'ACTIVE'
                    ? 'success'
                    : ticket.vcStatus === 'REVOKED'
                    ? 'error'
                    : 'default'
                }
                size='small'
              />
            </Box>

            {ticket.vcStatus === 'TRADING' && (
              <Button
                onClick={() => handleShelves('cancel', index)}
                variant='contained'
                size='small'
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                取消販售
              </Button>
            )}
            {ticket.vcStatus === 'ACTIVE' && (
              <Button
                onClick={() => handleShelves('shelves', index)}
                variant='contained'
                size='small'
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                上架販售
              </Button>
            )}
            {ticket.vcStatus === 'PENDING' && (
              <Button
                onClick={() => handleSearchold('get', index)}
                variant='contained'
                size='small'
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                領取票券
              </Button>
            )}
          </Box>
        </TicketCard>
      ))}
    </Box>
  );
}
