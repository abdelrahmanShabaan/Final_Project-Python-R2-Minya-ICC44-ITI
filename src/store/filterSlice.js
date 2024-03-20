// filterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceFilter: {
    minPrice: '',
    maxPrice: ''
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    }
  }
});

export const { setPriceFilter } = filterSlice.actions;

export default filterSlice.reducer;
