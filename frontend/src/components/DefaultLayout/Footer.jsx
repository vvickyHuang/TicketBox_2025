'use client';

import { Box, Typography, Link, Grid, Divider } from '@mui/material';

export default function Footer() {
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
        {/* 左側：公司資訊 */}
        <Grid>
          <Typography variant="h6" sx={{ fontSize: 16, mb: 2 }}>
            聯絡我們
          </Typography>

          <Typography>票票盒</Typography>
          <Typography>客服電話：+886 (02) 1234-5678</Typography>
          <Typography>
            電子信箱：
            <Link href="mailto:info@demo.com" color="inherit" underline="hover">
              info@ticketbox.com
            </Link>
          </Typography>
          <Typography>營業時間：週一至週五 09:00 - 18:00（例假日休息）</Typography>
        </Grid>

        {/* 右側：相關連結 */}
        {/* <Grid item xs={12} md={6}>
          <Typography variant='h6' sx={{ fontSize: 16, mb: 2 }}>
            快速連結
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href='#' color='inherit' underline='hover'>
              關於我們
            </Link>
            <Link href='#' color='inherit' underline='hover'>
              服務項目
            </Link>
            <Link href='#' color='inherit' underline='hover'>
              最新消息
            </Link>
            <Link href='#' color='inherit' underline='hover'>
              聯絡表單
            </Link>
          </Box>
        </Grid> */}
      </Grid>

      <Divider sx={{ my: 3, borderColor: '#444' }} />

      <Typography align="center" sx={{ fontSize: 13, color: '#ccc' }}>
        © {new Date().getFullYear()} ticketbox. All rights reserved.
      </Typography>
    </Box>
  );
}
