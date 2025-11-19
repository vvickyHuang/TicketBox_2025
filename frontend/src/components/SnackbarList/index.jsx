'use client';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Slide, Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { removeSnackbar } from '@/lib/features/snackbarSlice';
import { useEffect } from 'react';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

function SlideDownTransition(props) {
  return <Slide {...props} direction='down' />;
}

/* --- Toast 外框 --- */
const ToastCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 10,
  padding: '12px 16px 16px 16px',
  boxShadow: '0px 3px 12px rgba(0,0,0,0.15)',
  position: 'relative',
  width: '100%',
  minWidth: 300,
}));

/* --- Icon 背景圓形 --- */
const IconCircle = styled(Box)(({ color }) => ({
  width: 28,
  height: 28,
  borderRadius: '50%',
  backgroundColor: color + '22',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// 動態進度條動畫（從 100% → 0%）
const shrinkAnimation = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

/* --- 加上動畫的進度條 --- */
const ProgressBar = styled(Box)(({ color, duration }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: 4,
  backgroundColor: color,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  animation: `${shrinkAnimation} ${duration}ms linear forwards`,
}));

export default function SnackbarList() {
  const dispatch = useDispatch();
  const snackbars = useSelector((state) => state.snackbar.list);

  // ⏳ 自動移除
  useEffect(() => {
    snackbars.forEach((snack) => {
      setTimeout(() => {
        dispatch(removeSnackbar(snack.id));
      }, snack.duration + 100);
    });
  }, [snackbars, dispatch]);

  // 顏色與 icon map
  const colorMap = {
    success: '#4caf50',
    info: '#2196f3',
    warning: '#ff9800',
    error: '#f44336',
  };

  const iconMap = {
    success: <CheckCircleIcon sx={{ color: colorMap.success }} />,
    info: <InfoIcon sx={{ color: colorMap.info }} />,
    warning: <WarningIcon sx={{ color: colorMap.warning }} />,
    error: <ErrorIcon sx={{ color: colorMap.error }} />,
  };

  return (
    <>
      {snackbars.map((snack) => {
        const color = colorMap[snack.severity];

        return (
          <Snackbar
            key={snack.id}
            open
            autoHideDuration={snack.duration}
            TransitionComponent={SlideDownTransition}
            onClose={() => dispatch(removeSnackbar(snack.id))}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ mt: 1 }}
          >
            <ToastCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconCircle color={color}>{iconMap[snack.severity]}</IconCircle>

                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ fontWeight: 600 }}>{snack.title}</Box>
                  <Box sx={{ fontSize: 14, mt: 0.3 }}>{snack.message}</Box>
                </Box>
              </Box>

              {/* 🎉 有動畫的進度條 */}
              <ProgressBar color={color} duration={snack.duration} />
            </ToastCard>
          </Snackbar>
        );
      })}
    </>
  );
}
