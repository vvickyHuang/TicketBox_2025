'use client';
import { Box, Typography, Link, Grid, Divider } from '@mui/material';

export default function DLFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1c2227',
        color: '#fff',
        p: 4,
        mt: 8,
        fontSize: 14,
      }}>
      <Grid container spacing={4}>
        <Grid>
          <Typography variant="h6" sx={{ fontSize: 16, mb: 2 }}>
            聯絡我們
          </Typography>

          <Typography>票票盒</Typography>
          <Typography>客服電話：+886 (02) 1234-5678</Typography>
          <Typography>
            電子信箱：
            <Link href="mailto:info@ticketbox.com" color="inherit" underline="hover">
              info@ticketbox.com
            </Link>
          </Typography>
          <Typography>營業時間：週一至週五 09:00 - 18:00（例假日休息）</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderColor: '#444' }} />

      <Typography align="center" sx={{ fontSize: 13, color: '#ccc' }}>
        © {new Date().getFullYear()} ticketbox. All rights reserved.
      </Typography>
    </Box>
  );
}
