'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function HeroBanner() {
  const slides = [
    {
      title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
      date: '2025/11/14 (五)  ~ 2025/11/16 (日) ',
      location: '臺北大巨蛋',
      image:
        'https://static.tixcraft.com/images/activity/25_sjtp_853cb581812587601551359ae0ef9ed2.jpeg',
    },
    {
      title: 'Christian Kuria Paradigm Live in Taipei 2025',
      date: '2025/11/02 (日) ',
      location: 'Legacy TERA',
      image:
        'https://static.tixcraft.com/images/activity/25_kimberley_0631399903dc201a1026c8b7ca1c318c.jpg',
    },
    {
      title: 'TOMORROW X TOGETHER WORLD TOUR ＜ACT：TOMORROW＞ IN TAIPEI',
      date: '2026/01/31 (六)  ~ 2026/02/01 (日) ',
      location: '臺北大巨蛋',
      image:
        'https://static.tixcraft.com/images/activity/26_txt_99296655aefed82aac6fef02b5946791.jpg',
    },
    {
      title: 'Christian Kuria Paradigm Live in Taipei 2025',
      date: '2025/11/14 (五)',
      location: 'Hana Space 花漾展演空間',
      image:
        'https://static.tixcraft.com/images/activity/25_kuria_32a1022c2c069add3639189d34aa6c3f.png',
    },
  ];

  const [current, setCurrent] = useState(0);

  // 自動輪播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '50vh', md: '70vh' },
        overflow: 'hidden',
      }}>
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'opacity 1s ease',
            opacity: index === current ? 1 : 0,
          }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textAlign: 'center',
              px: { xs: 2, md: 4 },
            }}>
            <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: 24, md: 44 } }}>
              {slide.title}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, mb: 3, fontSize: { xs: 14, md: 18 } }}>
              {slide.date} ・ {slide.location}
            </Typography>
            {/* <Button
              variant="contained"
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 0.8, md: 1.2 },
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
              }}>
              立即購票
            </Button> */}
          </Box>
        </Box>
      ))}

      {/* 左右箭頭 */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: 10, md: 20 },
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
          fontSize: { xs: 'small', md: 'medium' },
        }}>
        <ArrowBackIosNewIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: 10, md: 20 },
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
          fontSize: { xs: 'small', md: 'medium' },
        }}>
        <ArrowForwardIosIcon fontSize="inherit" />
      </IconButton>

      {/* 底部指示點 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 10, md: 20 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: { xs: 0.5, md: 1 },
        }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(i)}
            sx={{
              width: { xs: 8, md: 10 },
              height: { xs: 8, md: 10 },
              borderRadius: '50%',
              backgroundColor: i === current ? '#8B5CF6' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
