import { Box, Typography, Button, Paper, Avatar, Chip, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailIcon from '@mui/icons-material/Mail';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SwitchBtn from '../../../../components/SwitchBtn';

export default function ProfileSidebar() {
  const navItems = ['一般會員', '交易會員'];

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box display='flex' flexDirection='column' alignItems='center' mb={2}>
        <Avatar src='/avatar2.jpg' sx={{ width: 80, height: 80, mb: 1 }} />
        <Typography fontWeight='bold'>Sarah Wang</Typography>
        <Typography variant='body2' color='text.secondary'>
          會員編號：TH2024001
        </Typography>
        <Chip
          icon={<CheckCircleIcon />}
          label='已認證會員'
          color='success'
          size='small'
          sx={{ mt: 1 }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight='bold' gutterBottom>
        帳戶狀態
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight='bold' gutterBottom>
        會員狀態
      </Typography>

      <SwitchBtn items={navItems} onSelect={(item) => console.log('Active:', item)} />

      <Box display='flex' alignItems='center' gap={1} mb={1}>
        <CreditCardIcon color='success' />
        <Typography variant='body2' flex={1}>
          身份認證
        </Typography>
        <Chip label='已完成' color='success' size='small' />
      </Box>
      <Box display='flex' alignItems='center' gap={1} mb={1}>
        <MailIcon color='success' />
        <Typography variant='body2' flex={1}>
          電子郵件
        </Typography>
        <Chip label='已驗證' color='success' size='small' />
      </Box>
      <Box display='flex' alignItems='center' gap={1} mb={2}>
        <SmartphoneIcon color='success' />
        <Typography variant='body2' flex={1}>
          手機號碼
        </Typography>
        <Chip label='已驗證' color='success' size='small' />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight='bold' gutterBottom>
        快速統計
      </Typography>
      <Box display='flex' gap={1}>
        <Paper sx={{ p: 2, textAlign: 'center', flex: 1, background: '#EEF2FF' }}>
          <Typography fontWeight='bold' color='primary.main'>
            8
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            總票券數
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', flex: 1, background: '#F3E8FF' }}>
          <Typography fontWeight='bold' color='secondary.main'>
            3
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            即將到來
          </Typography>
        </Paper>
      </Box>

      <Box className='mt-10 flex gap-4'>
        {
          <Button
            size='small'
            variant='contained'
            sx={{
              backgroundColor: '#EF4444', // 紅色主色 (#f87171 也可)
              borderRadius: 2,
              px: 2,
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 500,
              color: '#fff',
              '&:hover': { backgroundColor: '#DC2626' }, // hover 深紅
            }}
          >
            解除綁定
          </Button>
        }
        <Button
          size='small'
          variant='contained'
          sx={{
            backgroundColor: '#EF4444', // 紅色主色 (#f87171 也可)
            borderRadius: 2,
            px: 2,
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            color: '#fff',
            '&:hover': { backgroundColor: '#DC2626' }, // hover 深紅
          }}
        >
          刪除會員
        </Button>
      </Box>
    </Paper>
  );
}
