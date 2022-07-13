/* eslint-disable padding-line-between-statements */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCompanies,
  fetchBusinessUnits,
  fetchAllLocations,
  fetchCustomersByLocation,
} from 'src/store/thunks';

/**
 * An example of creating entity slices, reducers and INITIAL_STATE.
 */
interface IResponse {
  id: number;
  name: string;
  [key: string] : allAnyTypes;
}

interface IAppData {
  companies?: IResponse[];
  businessUnits?: IResponse[];
  locations?: IResponse[];
  customers?: IResponse[];
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
    resetCustomers: state => {
      if (state.data) state.data.customers = undefined;
    },
  },
  // A "builder callback" function used to add more reducers
  extraReducers: builder => {
    builder.addCase(fetchAllCompanies.fulfilled, (state, action) => {
      const { companies } = action.payload;
      if (!state.data) {
        state.data = {
          companies: [],
        }
      }
      state.data.companies = companies;
      state.data.businessUnits = undefined;
      state.data.locations = undefined;

    });

    builder.addCase(fetchBusinessUnits.fulfilled, (state, action) => {
      if (!state.data) {
        state.data = {
          businessUnits: [],
        }
      }
      state.data.businessUnits = action.payload;
      state.data.locations = undefined;
    });

    builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
      const { locations } = action.payload;
      if (!state.data) {
        state.data = {
          locations: [],
        }
      }
      state.data.locations = locations;
    });

    builder.addCase(fetchCustomersByLocation.fulfilled, (state, action) => {
      const { customers } = action.payload;
      if (!state.data) {
        state.data = {
          customers: [],
        }
      }
      state.data.customers = customers;
    });
  },
});

export const { resetBusinessUnits, resetLocations } = appEntitySlice.actions

export const appEntityReducer = appEntitySlice.reducer;
