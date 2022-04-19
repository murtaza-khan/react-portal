/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerService } from '../../services/customer';
import { setIsLoading } from '../slices/features/coupon';
import { getBaseUrl } from '../selectors/features/app';
import { toast } from 'react-toastify';

const customerService = new CustomerService();

export const fetchCustomerIds = createAsyncThunk<TObject, TObject, IActionOptions>(
  'coupon/fetchCustomerIds',
  async (apiData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const { data } = await customerService.fetchCustomerIds(baseUrl, apiData);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);