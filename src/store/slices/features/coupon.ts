/* eslint-disable padding-line-between-statements */
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  data: {
    page: 1,
    perPage: 20,
    totalCount: 0,
  },
  validationStates: {
    isLoading: false,
    error: null,
  },
};

export const couponFeatureSlice = createSlice({
  name: 'coupon',
  initialState: INITIAL_STATE,
  reducers: {
    resetCouponData: state => {
      state.data.page = 1;
      state.data.perPage = 20;
      state.data.totalCount = 0;
    },
    updateCurrentPage: (state, action) => {
      state.data.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.data.totalCount = action.payload;
    },
    setIsLoading: (state, action) => {
      state.validationStates.isLoading = action.payload;
    },
  },
});

export const { resetCouponData, updateCurrentPage, setTotalCount, setIsLoading } = couponFeatureSlice.actions

export const couponFeatureReducer = couponFeatureSlice.reducer;
