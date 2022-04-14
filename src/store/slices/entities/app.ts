/* eslint-disable padding-line-between-statements */
import { createSlice } from '@reduxjs/toolkit';
import { fetchAppData, fetchAllCompanies, fetchBusinessUnits, fetchAllLocations } from 'src/store/thunks/app';

/**
 * An example of creating entity slices, reducers and INITIAL_STATE.
 */
interface IResponse {
  id: number;
  name: string;
  [key: string] : any;
}

interface IAppData {
  companies?: IResponse[];
  businessUnits?: IResponse[];
  locations?: IResponse[];
}
interface IInitialState {
  data: IAppData | null;
}

const INITIAL_STATE : IInitialState = {
  data: null,
};

export const appEntitySlice = createSlice({
  // A name, used in action types
  name: 'app',
  // The initial state for the reducer
  initialState: INITIAL_STATE,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    resetAppData: state => {
      state.data = null;
    },
    resetBusinessUnits: state => {
      if (state.data) state.data.businessUnits = undefined;
    },
    resetLocations: state => {
      if (state.data) state.data.locations = undefined;
    },
  },
  // A "builder callback" function used to add more reducers
  extraReducers: builder => {
    builder.addCase(fetchAppData.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchAllCompanies.fulfilled, (state, action) => {
      const { companies } = action.payload;
      if (!state.data) {
        state.data = {
          companies: []
        }
      }
      state.data.companies = companies;
    });

    builder.addCase(fetchBusinessUnits.fulfilled, (state, action) => {
      if (!state.data) {
        state.data = {
          businessUnits: []
        }
      }
      state.data.businessUnits = action.payload;
    });

    builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
      const { locations } = action.payload;
      if (!state.data) {
        state.data = {
          locations: []
        }
      }
      state.data.locations = locations;
    });
  },
});

export const { resetBusinessUnits, resetLocations } = appEntitySlice.actions

export const appEntityReducer = appEntitySlice.reducer;
