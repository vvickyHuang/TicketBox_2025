'use client';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Box, Typography, IconButton, InputBase, Paper, ThemeProvider } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import theme from '@/app/theme';
import { useI18n } from '@/context/i18nContext';
import { useIsMobile } from '@/hook/useIsMobile';
const SearchSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
  padding: '32px 16px',
}));

const SearchBox = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '16px auto',
  width: '100%',
  maxWidth: 360,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

const CategoryBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '24px 0',
}));

const CategoryItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.background.subtle,
  },
}));

export default function SupportPage() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split('/')[1] || 'en';
  const t = useI18n();
  const isMobile = useIsMobile();
  const params = useParams();
  const id = params.id;

  const categories = [
    { key: 'purchase', title: '購票', desc: '購票及付款方式說明' },
    { key: 'collection', title: '取票', desc: '取票方式說明' },
    { key: 'business', title: '交易票券', desc: '交易票券方式說明' },
    { key: 'query', title: '查詢訂單', desc: '查詢訂單方式說明' },
    { key: 'contactUs', title: '聯繫我們', desc: '尋找協助' },
  ];

  const handleCategoryClick = (item) => {
    router.push(`/${lang}/faq/${item.key}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: 420,
          margin: '0 auto',
          bgcolor: theme.palette.background.paper,
          // minHeight: '100vh',
          border: `1px solid ${theme.palette.divider}`,
        }}>
        <SearchSection>
          <Typography variant="h5" sx={{ mb: 1 }}>
            嗨！您好，
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            有什麼能為您服務的嗎？
          </Typography>

          <SearchBox component="form" elevation={0}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="搜尋"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" sx={{ p: '10px', color: theme.palette.primary.main }}>
              <SearchIcon />
            </IconButton>
          </SearchBox>
        </SearchSection>

        <CategoryBox>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, px: 2, mb: 1, color: theme.palette.text.primary }}>
            類別
          </Typography>
          {categories.map((item, idx) => (
            <CategoryItem key={idx} onClick={() => handleCategoryClick(item)}>
              <Box>
                <Typography sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
              <ArrowForwardIosIcon sx={{ fontSize: 18, color: theme.palette.text.disabled }} />
            </CategoryItem>
          ))}
        </CategoryBox>
      </Box>
    </ThemeProvider>
  );
}
