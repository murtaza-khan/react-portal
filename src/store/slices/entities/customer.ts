/* eslint-disable padding-line-between-statements */
import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomerIds } from 'src/store/thunks';

interface IInitalState {
  data: null | ICoupon[]
}

const INITIAL_STATE : IInitalState = {
  data: null,
};

export const customerEntitySlice = createSlice({
  name: 'customerIds',
  initialState: INITIAL_STATE,
  reducers: {
    resetCustomerData: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCustomerIds.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});


export const customerEntityReducer = customerEntitySlice.reducer;
export const { resetCustomerData } = customerEntitySlice.actions;
