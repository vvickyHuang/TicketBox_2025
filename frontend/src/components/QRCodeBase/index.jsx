'use client';
import { Card, CardContent, Typography } from '@mui/material';

export default function QRCodeBase({ qrCodeBase64 }) {
  return (
    <div className="flex items-center justify-center gap-2 p-2 pb-0">
      <Card className="w-full">
        <CardContent style={{ textAlign: 'center' }}>
          {/* <Typography variant="h8" gutterBottom sx={{ mt: 1 }}>
            請用手機掃描 QR Code 並加入數位錢包
          </Typography> */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              mt: 1,
            }}>
            您的票券已準備好！
            <br />
            請使用手機掃描下方的 QR Code，將票券加入您的數位錢包。
            <br />
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
              mt: 1,
            }}
            variant="body">
            ⚠️ 請於 5 分鐘內完成掃描，否則QR Code將失效。
          </Typography>
          <div className="w-full flex justify-center items-center">
            {/* <img src={qrCodeBase64} alt="qr" className="w-[220px] h-[220px]" /> */}
            <img
              src={'/qrcode_localhost.png'}
              alt="qr"
              style={{ width: '220px', height: '220px' }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
