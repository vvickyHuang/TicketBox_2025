'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function HeroBanner() {
  const slides = [
    {
      title: 'Taylor Swift | The Eras Tour',
      date: '2024年12月15日',
      location: '台北小巨蛋',
      image: '/images/taylor.jpg',
    },
    {
      title: 'Ed Sheeran World Tour',
      date: '2024年12月20日',
      location: '高雄巨蛋',
      image: '/images/ed.jpg',
    },
    {
      title: 'BTS Yet To Come Concert',
      date: '2024年12月25日',
      location: '台中洲際棒球場',
      image: '/images/bts.jpg',
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
      sx={{ position: 'relative', width: '100%', height: { xs: 400, md: 520 }, overflow: 'hidden' }}
    >
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease',
            opacity: index === current ? 1 : 0,
          }}
        >
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
              px: 2,
            }}
          >
            <Typography variant='h3' fontWeight='bold' sx={{ fontSize: { xs: 28, md: 44 } }}>
              {slide.title}
            </Typography>
            <Typography variant='h6' sx={{ mt: 1, mb: 3 }}>
              {slide.date} ・ {slide.location}
            </Typography>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#8B5CF6',
                color: '#fff',
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#7C3AED' },
              }}
            >
              立即購票
            </Button>
          </Box>
        </Box>
      ))}

      {/* 左右箭頭 */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 20,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ArrowBackIosNewIcon fontSize='small' />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 20,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
        }}
      >
        <ArrowForwardIosIcon fontSize='small' />
      </IconButton>

      {/* 底部指示點 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(i)}
            sx={{
              width: 10,
              height: 10,
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
