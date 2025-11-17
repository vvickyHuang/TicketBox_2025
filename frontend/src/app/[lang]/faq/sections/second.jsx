'use client';
import React, { useState } from 'react';
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
import theme from '../theme';

// === Styled ===
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
  // 🔹 狀態控制：目前是否進入細節頁
  const [selectedItem, setSelectedItem] = useState(null);

  const faqs = {
    綁定Facebook之會員無法成功登入:
      '若您的 Facebook 綁定帳號無法登入，請確認 Facebook 授權狀態，並嘗試解除綁定重新登入。',
    會員加入辦法: '請至拓元售票系統首頁，點選「加入會員」，依指示輸入必要資訊並完成認證即可。',
    會員無法登入已綁定之帳號:
      '若顯示帳號重複或錯誤，請至會員中心使用『忘記密碼』功能或聯絡客服協助。',
    會員帳號連結綁定: '登入後可於『會員中心』>『帳號設定』中綁定 Facebook、Google 等快速登入方式。',
  };

  // 🔹 回到主列表
  const handleBack = () => setSelectedItem(null);

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        {/* Header */}
        <HeaderBar>購票</HeaderBar>

        {/* 如果目前有選項被點選 → 顯示詳細內容頁 */}
        {selectedItem ? (
          <>
            <BackBar>
              <IconButton size="small" onClick={handleBack}>
                <ArrowBackIosNewIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              </IconButton>
              <Typography sx={{ fontWeight: 600 }}>{selectedItem}</Typography>
            </BackBar>

            <Box sx={{ p: 3 }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.primary, lineHeight: 1.8 }}>
                {faqs[selectedItem]}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {/* Breadcrumb */}
            <Box sx={{ px: 2, py: 1 }}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 13 }}>
                <Link underline="hover" color="inherit" href="#">
                  tixcraft 拓元售票系統
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  購票
                </Link>
              </Breadcrumbs>
            </Box>

            {/* Section */}
            <SectionHeader>
              <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                購票
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                會員加入、購票及付款方式說明
              </Typography>
            </SectionHeader>

            {/* Accordion Group */}
            <Box sx={{ mt: 2 }}>
              <AccordionStyled defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    會員相關
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Object.keys(faqs).map((title) => (
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

              <AccordionStyled>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    購票方式
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    提供多種購票方式，包括網頁購票、App 購票等。
                  </Typography>
                </AccordionDetails>
              </AccordionStyled>

              <AccordionStyled>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    付款方式
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    支援信用卡、超商代碼及 ATM 轉帳等方式。
                  </Typography>
                </AccordionDetails>
              </AccordionStyled>
            </Box>
          </>
        )}
      </PageContainer>
    </ThemeProvider>
  );
}
