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
      desc: '會員加入、購票及付款方式說明',
      faqs: {
        綁定Facebook之會員無法成功登入:
          '若您的 Facebook 綁定帳號無法登入，請確認 Facebook 授權狀態，並嘗試解除綁定重新登入。',
        會員加入辦法:
          '請至票票盒售票系統首頁，點選「加入會員」，依指示輸入必要資訊並完成認證即可。',
        會員無法登入已綁定之帳號:
          '若顯示帳號重複或錯誤，請至會員中心使用「忘記密碼」功能或聯絡客服協助。',
        會員帳號連結綁定:
          '登入後可於「會員中心」→「帳號設定」中綁定 Facebook、Google 等快速登入方式。',
      },
    },
    collection: {
      name: '取票',
      desc: '取票方式說明',
      faqs: {
        超商取票方式: '至 7-11 / 全家 機台輸入取票代碼即可取票。',
        電子票如何使用: '於入場時出示手機電子票 QR Code。',
      },
    },
    business: {
      name: '交易票券',
      desc: '票券交易與轉讓說明',
      faqs: {
        如何轉讓票券: '依規範至會員中心執行票券轉讓。',
        票券是否可退: '依照活動規定通常不可退票。',
      },
    },
    query: {
      name: '查詢訂單',
      desc: '查詢訂單方式說明',
      faqs: {
        如何找到我的訂單: '請至會員中心 → 訂單查詢。',
        '訂單找不到？': '請確認登入帳號正確一致。',
      },
    },
    other: {
      name: '其他',
      desc: '其他類別說明',
      faqs: {
        忘記密碼: '可使用「忘記密碼」功能重新設定密碼。',
        修改會員資料: '可於會員中心更新個人資料。',
      },
    },
    contactUs: {
      name: '聯繫我們',
      desc: '尋找協助',
      faqs: {
        客服聯絡方式: '可透過客服表單聯絡我們。',
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
              <IconButton size='small' onClick={() => setSelectedItem(null)}>
                <ArrowBackIosNewIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              </IconButton>
              <Typography sx={{ fontWeight: 600 }}>{selectedItem}</Typography>
            </BackBar>

            <Box sx={{ p: 3 }}>
              <Typography variant='body1' sx={{ lineHeight: 1.8 }}>
                {data.faqs[selectedItem]}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {/* Breadcrumb */}
            <Box sx={{ px: 2, py: 1 }}>
              <Breadcrumbs aria-label='breadcrumb' sx={{ fontSize: 13 }}>
                <Link underline='hover' color='inherit' href={`/${lang}/faq`}>
                  ticketbox 票票盒售票系統
                </Link>
                <Link underline='hover' color='inherit' href='#'>
                  {data.name}
                </Link>
              </Breadcrumbs>
            </Box>

            {/* Section */}
            <SectionHeader>
              <Typography variant='h5' sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                {data.name}
              </Typography>
              <Typography variant='subtitle1' sx={{ mt: 1 }}>
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
                        onClick={() => setSelectedItem(title)}
                      >
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
