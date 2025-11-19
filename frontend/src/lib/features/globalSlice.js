import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { memberName: '' },
  tradingList: {},
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

    setTradingList: (state, action) => {
      state.tradingList = action.payload;
    },

    resetGlobal: () => initialState,
  },
});

export const { setUser, setBuyInfo, setTradingList, resetGlobal } = globalSlice.actions;

export default globalSlice.reducer;
