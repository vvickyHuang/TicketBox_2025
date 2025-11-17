'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function HeroBanner() {
  const slides = [
    {
      id: 11,
      title: 'BTS PERMISSION TO DANCE ON STAGE - TAIPEI',
      saleDate: '2025/11/20 (四）12:00',
      date: '2025/12/20(六) ~ 2025/12/21(日)',
      time: '19:30',
      location: '臺北大巨蛋',
      status: '熱售中',
      dateArr: [
        {
          date: '2025/12/20',
          time: '19:30',
          tickets: [
            {
              name: '特 A 區',
              areaKey: 'A',
              price: 6880,
            },
            {
              name: '特 B 區',
              areaKey: 'B',
              price: 6480,
            },
            {
              name: 'B2 看台區',
              areaKey: 'B2',
              price: 6280,
            },

            {
              name: 'B2 看台區 (部分視線遮蔽區)',
              areaKey: 'B2e',
              price: 5680,
            },
            {
              name: 'L2 看台區',
              areaKey: 'L2',
              price: 4880,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 3880,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 3680,
            },
            {
              name: 'L5 看台區',
              areaKey: 'L5',
              price: 2880,
            },
          ],
        },
        {
          date: '2025/12/21',
          time: '18:00',
          tickets: [
            {
              name: '特 A 區',
              areaKey: 'A',
              price: 6880,
            },
            {
              name: '特 B 區',
              areaKey: 'B',
              price: 6480,
            },
            {
              name: 'B2 看台區',
              areaKey: 'B2',
              price: 6280,
            },

            {
              name: 'B2 看台區 (部分視線遮蔽區)',
              areaKey: 'B2e',
              price: 5680,
            },
            {
              name: 'L2 看台區',
              areaKey: 'L2',
              price: 4880,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 3880,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 3680,
            },
            {
              name: 'L5 看台區',
              areaKey: 'L5',
              price: 2880,
            },
          ],
        },
      ],
      image: '/aiimg/btsbg.png',
      address: '台灣臺北市松山區南京東路4段',
      descMD: '/data/bts.md',
      locationImage: '/aiimg/btsseat.png',
    },
    {
      id: 1,
      title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
      saleDate: '2025/10/11 (六）12:00',
      date: '2025/11/14 (五)  ~ 2025/11/16 (日)',
      time: '19:30',
      location: '臺北大巨蛋',
      status: '熱售中',
      dateArr: [
        {
          date: '2025/11/14',
          time: '19:30',
          tickets: [
            {
              name: '特 A 區',
              areaKey: 'A',
              price: 6880,
            },
            {
              name: '特 B 區',
              areaKey: 'B',
              price: 6480,
            },
            {
              name: 'B2 看台區',
              areaKey: 'B2',
              price: 6280,
            },

            {
              name: 'B2 看台區 (部分視線遮蔽區)',
              areaKey: 'B2e',
              price: 5680,
            },
            {
              name: 'L2 看台區',
              areaKey: 'L2',
              price: 4880,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 3880,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 3680,
            },
            {
              name: 'L5 看台區',
              areaKey: 'L5',
              price: 2880,
            },
          ],
        },
        {
          date: '2025/11/15',
          time: '18:00',
          tickets: [
            {
              name: '特 A 區',
              areaKey: 'A',
              price: 6880,
            },
            {
              name: '特 B 區',
              areaKey: 'B',
              price: 6480,
            },
            {
              name: 'B2 看台區',
              areaKey: 'B2',
              price: 6280,
            },

            {
              name: 'B2 看台區 (部分視線遮蔽區)',
              areaKey: 'B2e',
              price: 5680,
            },
            {
              name: 'L2 看台區',
              areaKey: 'L2',
              price: 4880,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 3880,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 3680,
            },
            {
              name: 'L5 看台區',
              areaKey: 'L5',
              price: 2880,
            },
          ],
        },
        {
          date: '2025/11/16',
          time: '17:00',
          tickets: [
            {
              name: '特 A 區',
              areaKey: 'A',
              price: 6880,
            },
            {
              name: '特 B 區',
              areaKey: 'B',
              price: 6480,
            },
            {
              name: 'B2 看台區',
              areaKey: 'B2',
              price: 6280,
            },

            {
              name: 'B2 看台區 (部分視線遮蔽區)',
              areaKey: 'B2e',
              price: 5680,
            },
            {
              name: 'L2 看台區',
              areaKey: 'L2',
              price: 4880,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 3880,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 3680,
            },
            {
              name: 'L5 看台區',
              areaKey: 'L5',
              price: 2880,
            },
          ],
        },
      ],
      image: '/aiimg/sjbg.png',
      address: '台灣臺北市松山區南京東路4段',
      descMD: '/data/event-info.md',
      locationImage: '/aiimg/sjseat.png',
    },
    {
      id: 2,
      title: '頑童MJ116 OGS 臺中洲際演唱會',
      saleDate: '2025/10/11 (六）12:00',
      date: '2025/12/13 (六) - 2025/12/14 (日)',
      time: '19:30',
      location: '臺中洲際棒球場',
      status: '熱售中',
      dateArr: [
        {
          date: '2025/12/13',
          time: '19:30',
          tickets: [
            {
              name: 'MJ116VIP',
              areaKey: 'MJ116VIP',
              price: 4080,
            },
            {
              name: 'S區',
              areaKey: 'S',
              price: 3580,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 2380,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 1480,
            },
          ],
        },
        {
          date: '2025/12/14',
          time: '19:30',
          tickets: [
            {
              name: 'MJ116VIP',
              areaKey: 'MJ116VIP',
              price: 4080,
            },
            {
              name: 'S區',
              areaKey: 'S',
              price: 3580,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 2380,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 1480,
            },
          ],
        },
      ],
      image: '/aiimg/mj116bg.png',
      address: '臺中市北屯區崇德路三段835號',
      descMD: '/data/mj116.md',
      locationImage: '/aiimg/mj116seat.png',
    },
    {
      id: 3,
      title: 'TOMORROW X TOGETHER WORLD TOUR ＜ACT：TOMORROW＞ IN TAIPEI',
      saleDate: '2025/10/11 (六）12:00',
      date: '2026/01/31 (六) ~ 2026/02/01 (日)',
      time: '19:30',
      location: '臺北大巨蛋',
      status: '熱售中',
      dateArr: [
        {
          date: '2026/01/31',
          time: '19:30',
          tickets: [
            {
              name: 'MJ116VIP',
              areaKey: 'MJ116VIP',
              price: 4080,
            },
            {
              name: 'S區',
              areaKey: 'S',
              price: 3580,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 2380,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 1480,
            },
          ],
        },
        {
          date: '2026/02/01',
          time: '19:30',
          tickets: [
            {
              name: 'MJ116VIP',
              areaKey: 'MJ116VIP',
              price: 4080,
            },
            {
              name: 'S區',
              areaKey: 'S',
              price: 3580,
            },
            {
              name: 'L3 看台區',
              areaKey: 'L3',
              price: 2380,
            },
            {
              name: 'L4 看台區',
              areaKey: 'L4',
              price: 1480,
            },
          ],
        },
      ],
      image: '/aiimg/tomobg.png',
      address: '台灣臺北市松山區南京東路4段',
      descMD: '/data/together.md',
      locationImage: '/aiimg/sjseat.png',
    },
    {
      id: 4,
      title: 'Christian Kuria Paradigm Live in Taipei 2025',
      saleDate: '2025/10/11 (六）12:00',
      date: '2025/11/29 (五)',
      time: '19:30',
      location: 'Hana Space 花漾展演空間',
      status: '熱售中',
      dateArr: [
        {
          date: '2025/11/29',
          time: '19:30',
          tickets: [
            {
              name: 'VIP',
              areaKey: 'VIP',
              price: 3200,
            },
            {
              name: '全區',
              areaKey: 'All',
              price: 2100,
            },
          ],
        },
      ],
      image: '/aiimg/christianbg.png',
      address: '臺北市中正區仁愛路一段17號10樓',
      descMD: '/data/christian.md',
      locationImage: '/aiimg/sjseat.png',
    },
    {
      id: 5,
      title: '2025-26 TREASURE TOUR [PULSE ON] IN TAIPEI',
      saleDate: '2025/10/11 (六）12:00',
      date: '2026/03/28 (六)',
      time: '18:00',
      location: '國立體育大學綜合體育館（林口體育館）',
      status: '熱售中',
      dateArr: [
        {
          date: '2026/03/28',
          time: '18:00',
          tickets: [
            {
              name: 'VVIP',
              areaKey: 'VVIP',
              price: 7800,
            },
            {
              name: 'VIP',
              areaKey: 'VIP',
              price: 6800,
            },
            {
              name: 'L2看台區',
              areaKey: 'L2',
              price: 5800,
            },
            {
              name: 'L3看台區',
              areaKey: 'L3',
              price: 4800,
            },
            {
              name: 'L4看台區',
              areaKey: 'L4',
              price: 3800,
            },
            {
              name: 'L5看台區',
              areaKey: 'L5',
              price: 2800,
            },
          ],
        },
      ],
      image: '/aiimg/treasurebg.png',
      address: '臺北市中正區仁愛路一段17號10樓',
      descMD: '/data/treasure.md',
      locationImage: '/aiimg/sjseat.png',
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
