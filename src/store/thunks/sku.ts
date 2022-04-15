/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SkuService } from '../../services/sku';
import { setIsLoading } from '../slices/features/coupon';
import { getBaseUrl } from '../selectors/features/app';

const skuService = new SkuService();

export const fetchSkuIds = createAsyncThunk<TObject, TObject, IActionOptions>(
  'coupon/fetchSkuIds',
  async (apiData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const { data } = await skuService.fetchSkuIds(baseUrl, apiData);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue('Opps! There seems to be an error')
    }
  }
);