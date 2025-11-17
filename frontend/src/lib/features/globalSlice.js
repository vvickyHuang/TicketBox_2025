import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { memberName: '' },
  buyInfo: {
    ticketList: [],
    concertInfo: {},
    info: [],
    cardLast: '',
    payTime: '',
    orderId: '',
  },
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // if (typeof window !== 'undefined') {
      // sessionStorage.setItem('user', JSON.stringify(action.payload));
      // }
    },

    setBuyInfo: (state, action) => {
      state.buyInfo = {
        ...state.buyInfo,
        ...action.payload,
      };

      /* if (typeof window !== 'undefined') {
        sessionStorage.setItem('buyInfo', JSON.stringify(state.buyInfo));
      } */
    },

    resetGlobal: () => initialState,
  },
});

export const { setUser, setBuyInfo, resetGlobal } = globalSlice.actions;

export default globalSlice.reducer;
