/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerService } from 'src/services';
import { setIsLoading } from '../slices/features/coupon';
import { getBaseUrl } from '../selectors/features/app';
import { toast } from 'react-toastify';
import { CUSTOMER_FETCH_IDS } from 'src/store/action-types';

const customerService = new CustomerService();

export const fetchCustomerIds = createAsyncThunk<TObject, TObject, IActionOptions>(
  CUSTOMER_FETCH_IDS,
  async (apiData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      let response: allAnyTypes = [];
      const chunkSize = 200;
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

      if (response.length != apiData.phone.length) {
        const responseArray = response.map((customer: { phone: string; }) => customer.phone);
        const errorCustomers = apiData.phone.filter((phone: string) => !responseArray.includes(phone));
        throw { statusText: `Customer ${errorCustomers[0]} not found` };
      }

      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(response);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      thunkAPI.dispatch(setIsLoading(false));
      apiData.onError();
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);
