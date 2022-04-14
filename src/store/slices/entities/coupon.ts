/* eslint-disable padding-line-between-statements */
import { createSlice } from '@reduxjs/toolkit';
import { fetchCoupons } from 'src/store/thunks';

interface IInitalState {
  data: null | ICoupon[]
}

const INITIAL_STATE : IInitalState = {
  data: null,
};

export const couponEntitySlice = createSlice({
  name: 'coupon',
  initialState: INITIAL_STATE,
  reducers: {
    resetCouponData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCoupons.fulfilled, (state, action) => {
      const { coupons } = action.payload;
      state.data = coupons;
    });

  },
});

// export const { resetBusinessUnits, resetLocations } = couponEntitySlice.actions

export const couponEntityReducer = couponEntitySlice.reducer;
