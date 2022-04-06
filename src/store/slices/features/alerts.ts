import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  data: {
    message: "",
    type: "",
  },
  validationStates: {
    isVisible: false,
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState: INITIAL_STATE,
  reducers: {
    showAlert: (state, action) => {
      state.data.message = action.payload?.message;
      state.data.type = action.payload?.type;
      state.validationStates.isVisible = true;
    },
    hideAlert: (state) => {
      state.data.message = "";
      state.data.type = "";
      state.validationStates.isVisible = false;
    },
  },
});

export const alertReducer = alertSlice.reducer;
export const { showAlert, hideAlert } = alertSlice.actions;
