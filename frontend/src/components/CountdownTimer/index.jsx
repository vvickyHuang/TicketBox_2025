import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

export default function CountdownTimer({ onTimeChange }) {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 分鐘倒數

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onTimeChange) onTimeChange('00:00'); // 倒數結束
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onTimeChange]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  // 每秒回傳給父元件
  useEffect(() => {
    if (onTimeChange) onTimeChange(formattedTime);
  }, [formattedTime, onTimeChange]);

  return (
    <Typography variant="body1" sx={{ fontWeight: 600, color: '#ff4d4f' }}>
      剩餘時間: {formattedTime}
    </Typography>
  );
}
