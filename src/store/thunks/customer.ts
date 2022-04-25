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
      let response: any = [];
      const chunkSize = 500;
      for (let i = 0; i < apiData.phone.length; i += chunkSize) {
        const chunk = apiData.phone.slice(i, i + chunkSize);
        const { data } = await customerService.fetchCustomerIds(baseUrl,
          {
            select: apiData.select,
            phone: chunk.toString(),
            limit: chunkSize
          });
        response = [...response, ...data];
      }

      if (response.length === 0) {
        throw { statusText: 'No customers found against provided csv file' };
      }

      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(response);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);