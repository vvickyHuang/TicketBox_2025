'use client';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert, Slide } from '@mui/material';
import { removeSnackbar } from '@/lib/features/snackbarSlice';
import { useEffect } from 'react';

function SlideDownTransition(props) {
  return <Slide {...props} direction='down' />;
}

export default function SnackbarList() {
  const dispatch = useDispatch();
  const snackbars = useSelector((state) => state.snackbar.list);

  // 自動移除每個 Snackbar
  useEffect(() => {
    snackbars.forEach((snack) => {
      setTimeout(() => {
        dispatch(removeSnackbar(snack.id));
      }, snack.duration + 500);
    });
  }, [snackbars, dispatch]);

  return (
    <>
      {snackbars.map((snack) => (
        <Snackbar
          key={snack.id}
          open
          autoHideDuration={snack.duration}
          TransitionComponent={SlideDownTransition}
          onClose={() => dispatch(removeSnackbar(snack.id))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ mb: 1 }}
        >
          <Alert
            severity={snack.severity}
            onClose={() => dispatch(removeSnackbar(snack.id))}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 2 }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
