import { Box, Typography, Avatar } from '@mui/material';

const popular = [
  {
    name: 'BTS PERMISSION TO DANCE ON STAGE',
    date: '臺北大巨蛋 2025/12/20 (六',
    image: '/aiimg/btsbg.png',
  },
  {
    name: 'SUPER JUNIOR 20th Anniversary TOUR',
    date: '臺北大巨蛋 2025/10/11 (六',
    image: '/aiimg/sjbg.png',
  },
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
