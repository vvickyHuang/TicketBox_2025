'use client';
import { Box, Typography, Link, Grid, Divider } from '@mui/material';
import { useI18n } from '@/context/i18nContext';

export default function DLFooter() {
  const t = useI18n();
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
            {t.main.Contact}
          </Typography>
          <Typography>{t.main.TicketBox}</Typography>
          <Typography>{t.main.phone}</Typography>
          <Typography>
            {t.main.email}
            <Link href="mailto:info@ticketbox.com" color="inherit" underline="hover">
              info@ticketbox.com
            </Link>
          </Typography>
          <Typography>{t.main.time}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderColor: '#444' }} />

      <Typography align="center" sx={{ fontSize: 13, color: '#ccc' }}>
        © {new Date().getFullYear()} ticketbox. All rights reserved.
      </Typography>
    </Box>
  );
}
