import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppService } from '../../services/app';
import { getBaseUrl } from '../selectors/features/app';
import { fetchCoupons } from 'src/store/thunks/coupon';
import { toast } from 'react-toastify';

/**
 * Just an example below that how we will create asynchronous actions
 * Mostly these actions used to make an Api call and returns response to the reducers
 * to update the data in the reducers
 */

const appService = new AppService();

export const fetchAppData = createAsyncThunk<TObject, TObject, IActionOptions>(
  'app/fetchAppData',
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    // Example of an API call to fetch the app-data
    const baseUrl = getBaseUrl(thunkAPI.getState());
    const response = await appService.fetchAppData(baseUrl);

    // const response = { data: null, error: { message: 'API failed with status 400' }}; // example response
    if (response.error) {
      return thunkAPI.rejectWithValue({ ...response.error });
    }

    return response?.data;
  }
);

export const fetchAllCompanies = createAsyncThunk<TObject, TObject, IActionOptions>(
  'app/fetchAllCompanies',
  async (_: any, thunkAPI) => {
    try {
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const { data } = await appService.fetchAllCompanies(baseUrl);
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);

export const fetchBusinessUnits = createAsyncThunk<TObject, TObject, IActionOptions>(
  'app/fetchBusinessUnits',
  async (companyId: string, thunkAPI) => {
    try {
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const { data } = await appService.fetchBusinessUnits(baseUrl, companyId);
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);

export const fetchAllLocations = createAsyncThunk<TObject, TObject, IActionOptions>(
  'app/fetchAllLocations',
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    try {
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const { companyId, businessUnitId } = _requestPayload;
      const { data } = await appService.fetchAllLocations(baseUrl, companyId, businessUnitId);
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);

export const fetchInitialData = () => async (dispatch: any): Promise<any> => {
  dispatch(fetchAllCompanies({}));
  dispatch(fetchCoupons({}));
};
