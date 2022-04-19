import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../thunks';


/**
 * An example of creating entity slices, reducers and INITIAL_STATE.
 */

const INITIAL_STATE = {
  data: null,
};

export const customerFeatureSlice = createSlice({
  name: 'customerIds',
  initialState: INITIAL_STATE,
  reducers: {
    resetAppData: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(logout.fulfilled, state => {
      state.data = null;
    });
  },
});

export const customerFeatureReducer = customerFeatureSlice.reducer;
