/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponService } from 'src/services';
import { getBaseUrl, getSearchValue, getSelectedLocationId, getSelectedBusinessUnitId, getSelectedCompanyId } from '../selectors/features/app';
import { getCouponPerPage, getCouponsPage } from '../selectors/features/coupon';
import { setIsLoading, setTotalCount } from '../slices/features/coupon';
import { toast } from 'react-toastify';
import history from 'src/utils/history';
import { MAIN_ROUTE } from 'src/constants/navigation-routes';
import { COUPON_MESSAGES } from 'src/constants/toast-messages';
import { COUPON_FETCH, COUPON_CREATE, COUPON_UPDATE } from 'src/store/action-types';
import { STATUS_MESSAGES } from 'src/constants/response-types';

const couponService = new CouponService();

export const fetchCoupons = createAsyncThunk<TObject, TObject, IActionOptions>(
  COUPON_FETCH,
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const page = getCouponsPage(thunkAPI.getState());
      const perPage = getCouponPerPage(thunkAPI.getState());
      const search = getSearchValue(thunkAPI.getState());
      const companyId = getSelectedCompanyId(thunkAPI.getState());
      const businessUnitId = getSelectedBusinessUnitId(thunkAPI.getState());
      const locationId = getSelectedLocationId(thunkAPI.getState());
      const apiData = {
        perPage, page, search, companyId, businessUnitId, locationId,
      };
      const { data } = await couponService.fetchCoupons(baseUrl, apiData);
      const { totalCount } = data;
      thunkAPI.dispatch(setTotalCount(totalCount));
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      if (statusText === STATUS_MESSAGES.PROVIDE_JWT) {
        statusText = STATUS_MESSAGES.UNAUTHORIZED;
      }
      toast.error(`${statusText}`);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);

export const createCoupon = createAsyncThunk<TObject, TObject, IActionOptions>(
  COUPON_CREATE,
  async (apiData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const baseUrl = getBaseUrl(thunkAPI.getState());
      const { data } = await couponService.createCoupon(baseUrl, apiData);
      thunkAPI.dispatch(setIsLoading(false));
      toast.success(COUPON_MESSAGES.COUPON_CREATED);
      history.push(MAIN_ROUTE);
      return thunkAPI.fulfillWithValue(data);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue(statusText);
    }
  }
);

export const updateCoupon = createAsyncThunk<TObject, TObject, IActionOptions>(
  COUPON_UPDATE,
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    try {
      const baseUrl = getBaseUrl(thunkAPI.getState());
      await couponService.updateCoupon(baseUrl, _requestPayload);
      toast.success(COUPON_MESSAGES.COUPON_CREATED);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
    }
  }
);
