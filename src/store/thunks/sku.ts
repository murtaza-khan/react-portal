/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SkuService } from '../../services/sku';
import { setIsLoading } from '../slices/features/coupon';
import { getBaseUrl } from '../selectors/features/app';
import { toast } from 'react-toastify';

const skuService = new SkuService();

export const fetchSkuIds = createAsyncThunk<TObject, TObject, IActionOptions>(
  'coupon/fetchSkuIds',
  async (apiData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      let response: any = [];
      const chunkSize = 200;
      for (let i = 0; i < apiData.sku.length; i += chunkSize) {
        const chunk = apiData.sku.slice(i, i + chunkSize);
        const { data } = await skuService.fetchSkuIds(baseUrl,
          {
            sku: chunk.toString(),
            select: apiData.select,
            locationId: apiData.locationId
          });
        response = [...response, ...data];
      }

      if (response.length != apiData.sku.length) {
        const responseArray = response.map((product: { sku: string; }) => product.sku);
        const errorSkus = apiData.sku.filter((sku: any) => !responseArray.includes(sku));
        throw { statusText: `Sku ${errorSkus[0]} not found` };
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