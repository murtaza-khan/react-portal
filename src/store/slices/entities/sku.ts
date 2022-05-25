/* eslint-disable padding-line-between-statements */
import { createSlice } from '@reduxjs/toolkit';
import { fetchSkuIds } from 'src/store/thunks/sku';

interface IInitalState {
  data: null | ICoupon[]
}

const INITIAL_STATE : IInitalState = {
  data: null,
};

export const skuEntitySlice = createSlice({
  name: 'skuIds',
  initialState: INITIAL_STATE,
  reducers: {
    resetSkuData: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSkuIds.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});


export const skuEntityReducer = skuEntitySlice.reducer;
export const { resetSkuData } = skuEntitySlice.actions;
