/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponService } from '../../services/coupon';
import { getBaseUrl, getSearchValue, getSelectedLocationId } from '../selectors/features/app';
import { getCouponPerPage, getCouponsPage } from '../selectors/features/coupon';
import { setIsLoading, setTotalCount } from '../slices/features/coupon';

const couponService = new CouponService();

export const fetchCoupons = createAsyncThunk<TObject, TObject, IActionOptions>(
  'coupon/fetchCoupons',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const page = getCouponsPage(thunkAPI.getState());
      const perPage = getCouponPerPage(thunkAPI.getState());
      const search = getSearchValue(thunkAPI.getState());
      const locationId = getSelectedLocationId(thunkAPI.getState());
      const apiData = {
        perPage, page, search, locationId,
      };
      const { data } = await couponService.fetchCoupons(baseUrl, apiData);
      const { totalCount } = data;
      thunkAPI.dispatch(setTotalCount(totalCount));
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue('Opps there seems to be an error')
    }
  }
);
