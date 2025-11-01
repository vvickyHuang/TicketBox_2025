import { Grid, Paper, Typography, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';

export default function EventInfoCard() {
  const info = [
    { icon: <EventIcon color='primary' />, label: '日期', value: '2024年3月15日' },
    { icon: <AccessTimeIcon color='primary' />, label: '時間', value: '19:30' },
    { icon: <LocationOnIcon color='primary' />, label: '地點', value: '台北小巨蛋' },
    { icon: <GroupIcon color='primary' />, label: '年齡限制', value: '6歲以上' },
  ];

  return (
    <>
      <Paper sx={{ mt: 3, p: 3, borderRadius: 3 }}>
        <Grid container spacing={2}>
          {info.map((item, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Typography variant='body2' color='text.secondary'>
                {item.label}
              </Typography>
              <Typography display='flex' alignItems='center' gap={1}>
                {item.icon}
                <strong>{item.value}</strong>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h6' gutterBottom>
          活動介紹
        </Typography>
        <Typography variant='body1' color='text.secondary' lineHeight={1.8}>
          Taylor Swift 的 The Eras Tour 是一場跨越她整個音樂生涯的史詩級演唱會體驗。
          從她的首張專輯到最新作品，透過壯觀的舞台燈光、精心設計的造型，
          帶來令人難以忘懷的音樂之夜。
        </Typography>
      </Box>
    </>
  );
}
