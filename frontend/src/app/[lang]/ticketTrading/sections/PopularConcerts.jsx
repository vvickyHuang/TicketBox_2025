import { Box, Typography, Avatar } from '@mui/material';

const popular = [
  { name: 'Taylor Swift', date: '12/15 台北小巨蛋', image: '/img/event1.jpg' },
  { name: 'BTS', date: '12/20 高雄巨蛋', image: '/img/event1.jpg' },
  { name: 'Ed Sheeran', date: '1/05 台中洲際體育場', image: '/img/event1.jpg' },
];

export default function PopularConcerts() {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        熱門演唱會
      </Typography>
      {popular.map((item, i) => (
        <Box key={i} display="flex" alignItems="center" gap={2} mb={1.5}>
          <Avatar src={item.image} variant="rounded" />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {item.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
