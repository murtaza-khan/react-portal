/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponService } from '../../services/coupon';
import { getBaseUrl, getSearchValue, getSelectedLocationId, getSelectedBusinessUnitId } from '../selectors/features/app';
import { getCouponPerPage, getCouponsPage } from '../selectors/features/coupon';
import { setIsLoading, setTotalCount } from '../slices/features/coupon';
import { toast } from 'react-toastify';
import history from 'src/utils/history';

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
      const businessUnitId = getSelectedBusinessUnitId(thunkAPI.getState());
      const locationId = getSelectedLocationId(thunkAPI.getState());
      const apiData = {
        perPage, page, search, businessUnitId, locationId,
      };
      const { data } = await couponService.fetchCoupons(baseUrl, apiData);
      const { totalCount } = data;
      thunkAPI.dispatch(setTotalCount(totalCount));
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);

export const createCoupon = createAsyncThunk<TObject, TObject, IActionOptions>(
  'coupon/createCoupons',
  async (apiData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const { data } = await couponService.createCoupon(baseUrl, apiData);
      thunkAPI.dispatch(setIsLoading(false));
      toast.success('Coupon created successfully');
      history.push('/couponportal');
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);

export const updateCoupon = createAsyncThunk<TObject, TObject, IActionOptions>(
  'coupon/updateCoupon',
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    try {
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const response = await couponService.updateCoupon(baseUrl, _requestPayload);
      toast.success('Coupon updated successfully');
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
    }
  }
);
