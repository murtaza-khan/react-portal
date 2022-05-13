import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../thunks';


/**
 * An example of creating entity slices, reducers and INITIAL_STATE.
 */

interface ITokenData {
  token: string;
}
interface IInitialState {
  data: ITokenData | null;
}

const INITIAL_STATE: IInitialState = {
  data: null,
};

export const authFeatureSlice = createSlice({
  // A name, used in action types
  name: 'auth',
  // The initial state for the reducer
  initialState: INITIAL_STATE,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    resetAppData: state => {
      state.data = null;
    },
    setAuthToken: (state, action) => {
      if (!state.data) {
        state.data = {
          token: ''
        };
      }

      state.data.token = action.payload;
    },
    setAuthData: (state, action) => {
      state.data = action.payload;
    },
  },
  // A "builder callback" function used to add more reducers
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(logout.fulfilled, state => {
      state.data = null;
    });
  },
});

export const authFeatureReducer = authFeatureSlice.reducer;
export const { setAuthToken, setAuthData } = authFeatureSlice.actions;
