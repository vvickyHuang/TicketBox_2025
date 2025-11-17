// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import globalSlice from './features/globalSlice';
import snackbarReducer from './features/snackbarSlice';

const store = configureStore({
  reducer: {
    global: globalSlice,
    snackbar: snackbarReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
