'use client';
import { Card, CardContent, Typography } from '@mui/material';

export default function Home({ qrCodeBase64 }) {
  return (
    <div className="flex items-center justify-center gap-4 p-6 pb-0">
      <Card className="w-full">
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
            票票盒數位憑證
          </Typography>
          <div className="w-full flex justify-center items-center">
            <img src={qrCodeBase64} alt="qr" className="w-[220px] h-[220px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
