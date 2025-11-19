'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import theme from '@/app/theme';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: 420,
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  minHeight: '100vh',
  paddingBottom: '40px',
}));

const HeaderBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  height: 56,
  fontWeight: 600,
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `3px solid ${theme.palette.primary.main}`,
  padding: '16px',
}));

const AccordionStyled = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  margin: '8px 16px',
  borderRadius: theme.shape.borderRadius,
  '&:before': { display: 'none' },
  '&.Mui-expanded': {
    margin: '8px 16px',
  },
}));

const BackBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function TicketPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const params = useParams();
  const lang = params.lang;
  const key = params.id;
  const SUPPORT_MAP = {
    purchase: {
      name: '購票',
      desc: '購票及付款方式說明',
      faqs: {
        購票方式: '選擇活動場次，確認票種、數量與相關資訊，完成購買流程並確認訂單內容無誤。',
        付款方式: '確認場次與相關資訊無誤即可使用信用卡付款。',
      },
    },
    collection: {
      name: '取票',
      desc: '取票方式說明',
      faqs: {
        手機版取票:
          '購買完成後，系統會提供票券連結，點擊連結後會自動開啟"數位憑證皮夾APP"並將票券加入您的錢包中',
        電腦版取票:
          '購買完成後，將顯示您的 票券 QR Code，使用手機 掃描 QR Code 即可將票券加入您的"數位憑證皮夾APP" 中。',
      },
    },
    business: {
      name: '票券轉讓',
      desc: '票券轉讓說明',
      faqs: {
        我要購買票券:
          '前往票券轉讓頁面，瀏覽可供轉售的票券清單，選擇您想購買的票券，確認相關資訊後完成購買流程即可。',
      },
    },
    query: {
      name: '查詢訂單',
      desc: '查詢訂單方式說明',
      faqs: {
        如何找到我的訂單編號: '請至您的 Email 信箱，查找系統寄出的 訂單通知信。',
        如何找到我的訂單:
          '前往我的訂單頁面，輸入您的訂單編號與購買時使用的 Email 信箱，即可查詢您的訂單資訊。',
        更改票券狀態: '您可以針對已購買的票券進行以下操作，領取票券、販售票券、取消販售。',
        領取票券: '將票券加入"數位憑證皮夾APP"。',
        販售票券:
          '將票券轉售至票券轉讓，點選"販售票券"按鈕，並透過"數位憑證皮夾APP"選擇您想要轉售的票券，確認資訊後即可成功上架欲轉售的票券。',
        取消販售:
          '前往票券轉讓頁面，點擊"取消販售"按鈕，並透過"數位憑證皮夾APP"選擇您想要取消販售的票券，確認資訊後即可成功取消販售狀態。',
      },
    },
    contactUs: {
      name: '聯繫我們',
      desc: '尋找協助',
      faqs: {
        客服電話: '+886 (02) 1234-5678',
        電子信箱: 'info@ticketbox.com',
        營業時間: '週一至週五 09:00 - 18:00（例假日休息）',
      },
    },
  };

  const data = SUPPORT_MAP[key];
  if (!data) return null;

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <HeaderBar>{data.name}</HeaderBar>

        {selectedItem ? (
          <>
            <BackBar>
              <IconButton size="small" onClick={() => setSelectedItem(null)}>
                <ArrowBackIosNewIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              </IconButton>
              <Typography sx={{ fontWeight: 600 }}>{selectedItem}</Typography>
            </BackBar>

            <Box sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {data.faqs[selectedItem]}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {/* Breadcrumb */}
            <Box sx={{ px: 2, py: 1 }}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 13 }}>
                <Link underline="hover" color="inherit" href={`/${lang}/faq`}>
                  ticketbox 票票盒售票系統
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  {data.name}
                </Link>
              </Breadcrumbs>
            </Box>

            {/* Section */}
            <SectionHeader>
              <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                {data.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {data.desc}
              </Typography>
            </SectionHeader>

            {/* FAQ List */}
            <Box sx={{ mt: 2 }}>
              <AccordionStyled defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>{data.name}相關</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Object.keys(data.faqs).map((title) => (
                      <Typography
                        key={title}
                        sx={{
                          color: theme.palette.primary.main,
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={() => setSelectedItem(title)}>
                        {title}
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </AccordionStyled>
            </Box>
          </>
        )}
      </PageContainer>
    </ThemeProvider>
  );
}
