'use client';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Alert, CircularProgress } from '@mui/material';

export default function Home({ qrCodeBase64 }) {
  return (
    <div
      style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 24, paddingBottom: 0 }}>
      <Card sx={{ width: '100%' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
            QR Code
          </Typography>
          <div style={{ margin: '12px 0' }}>
            <img src={qrCodeBase64} alt="qr" style={{ width: 220, height: 220 }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
