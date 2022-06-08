import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomersByLocation } from "../../thunks";
import { ROUTES } from "../../../constants/navigation-routes";
/**
 * An example of creating feature slices, reducers and INITIAL_STATE.
 */

interface IAppFeature {
  baseUrl: string,
  activeScreen: string,
  selectedCompanyId: string,
  selectedBusinessUnitId: string,
  selectedLocationId: string,
  searchValue: string,
  selectedCustomers: ICustomerRow[],
  customer: {
    page: number | string,
    perPage: number | string,
    totalCount: number | string,
    status: string, // can be 'idle', 'pending', 'succeeded', 'failed',
    filter: string,
  },
  validationStates: {
    isLoading: boolean,
    error: null,
  },
}

const INITIAL_STATE: IAppFeature = {
  baseUrl: process.env.REACT_APP_BASE_URL || '',
  activeScreen: ROUTES.LOGIN,
  selectedCompanyId: "",
  selectedBusinessUnitId: "",
  selectedLocationId: "",
  searchValue: "",
  selectedCustomers: [],
  customer: {
    page: 1,
    perPage: 20,
    totalCount: 0,
    status: "idle", // can be 'idle', 'pending', 'succeeded', 'failed',
    filter: '',
  },
  validationStates: {
    isLoading: false,
    error: null,
  },
};

export const appFeatureSlice = createSlice({
  // A name, used in action types
  name: "app",
  // The initial state for the reducer
  initialState: INITIAL_STATE,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    toggleLoading: (state) => {
      state.validationStates.isLoading = true;
    },
    updateCustomerCurrentPage: (state, action) => {
      state.customer.page = action.payload;
    },
    updateCustomerfilter: (state, action) => {
      state.customer.filter = action.payload;
    },
    setSelectedCustomers: (state, action) => {
      state.selectedCustomers = action.payload;
    },
    resetSelectedCustomers: (state) => {
      state.selectedCustomers = [];
    },
    updateSelectedCompanyId: (state, action) => {
      state.selectedCompanyId = action.payload;
    },
    updateSelectedBusinessUnitId: (state, action) => {
      state.selectedBusinessUnitId = action.payload;
    },
    updateSelectedLocationId: (state, action) => {
      state.selectedLocationId = action.payload;
    },
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  // A "builder callback" function used to add more reducers
  extraReducers: (builder) => {
    builder.addCase(fetchCustomersByLocation.pending, (state) => {
      state.customer.status = "pending";
    });
    builder.addCase(fetchCustomersByLocation.fulfilled, (state, action) => {
      const { totalCount } = action.payload;
      state.customer.status = 'succeeded'
      state.customer.totalCount = totalCount

    })
    builder.addCase(fetchCustomersByLocation.rejected, state => {
      state.customer.status = 'failed'
    })
  },
});

export const {
  toggleLoading,
  setSelectedCustomers,
  resetSelectedCustomers,
  updateCustomerCurrentPage,
  updateSelectedCompanyId,
  updateSelectedBusinessUnitId,
  updateSelectedLocationId,
  updateSearchValue,
  updateCustomerfilter,
} = appFeatureSlice.actions;
export const appFeatureReducer = appFeatureSlice.reducer;
