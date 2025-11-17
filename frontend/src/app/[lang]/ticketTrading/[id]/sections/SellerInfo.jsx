import { Box, Paper, Avatar, Typography, Button, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function SellerInfo({ ticket }) {
  const seller = ticket?.seller;
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={seller?.avatar} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography fontWeight="bold">{seller?.name}</Typography>
          <Box display="flex" alignItems="center" gap={0.5}>
            <StarIcon color="warning" fontSize="small" />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" color="text.secondary">
        信箱通知狀態：{seller?.isEmail ? '開啟' : '關閉'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        簡訊通知狀態：{seller?.isMessage ? '開啟' : '關閉'}
      </Typography>
      {/* <Typography variant="body2" color="text.secondary">
        上次上線時間：{seller?.response}
      </Typography> */}

      <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
        聯絡賣家
      </Button>

      <Box sx={{ mt: 3 }}>
        <Typography fontWeight="bold">NT$ {ticket?.price?.total.toLocaleString()}</Typography>

        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2, py: 1.2 }}>
          立即購買
        </Button>
      </Box>
    </Paper>
  );
}
