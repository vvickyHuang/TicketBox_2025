import { createSlice } from '@reduxjs/toolkit';

let idCounter = 0;

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    list: [],
  },
  reducers: {
    addSnackbar: (state, action) => {
      const { message, severity = 'info', duration = 3000 } = action.payload;
      const id = ++idCounter;
      state.list.push({ id, message, severity, duration });
    },
    removeSnackbar: (state, action) => {
      state.list = state.list.filter((snack) => snack.id !== action.payload);
    },
  },
});

export const { addSnackbar, removeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
