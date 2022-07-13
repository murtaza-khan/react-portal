/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CouponService } from 'src/services';
import {
  getBaseUrl,
  getSearchValue,
  getSelectedLocationId,
  getSelectedBusinessUnitId,
  getSelectedCompanyId,
} from '../selectors/features/app';
import { getCouponPerPage, getCouponsPage } from '../selectors/features/coupon';
import { setIsLoading, setTotalCount } from '../slices/features/coupon';
import { toast } from 'react-toastify';
import history from 'src/utils/history';
import { MAIN_ROUTE } from 'src/constants/navigation-routes';
import { COUPON_MESSAGES } from 'src/constants/toast-messages';
import {
  COUPON_FETCH,
  COUPON_CREATE,
  COUPON_UPDATE,
} from 'src/store/action-types';
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
      const selectedbusinessUnitId = getSelectedBusinessUnitId(thunkAPI.getState());
      const selectedlocationId = getSelectedLocationId(thunkAPI.getState());
      const apiData = {
        perPage, page, search, companyId, selectedbusinessUnitId, selectedlocationId,
      };
      const { data } = await couponService.fetchCoupons(baseUrl, apiData);
      const { coupons, totalCount } = data;
      const uniqueBusinessUnitIds = new Map();
      const uniqueLocationIds = new Map();
      coupons.forEach((coupon: ICoupon) => {
        uniqueBusinessUnitIds.set(coupon.businessUnitId, coupon.businessUnit || '-');
        uniqueLocationIds.set(coupon.locationId, coupon.location || '-');
      });

      if (uniqueBusinessUnitIds.size !== 0) {
        await Promise.allSettled(
          Array.from(uniqueBusinessUnitIds).map(async ([businessUnitId]) => {
            const { data: { name: businessUnitName } } =
              await couponService.fetchBusinessUnitById(baseUrl, businessUnitId);
            uniqueBusinessUnitIds.set(businessUnitId, businessUnitName);
          })
        );
      }

      if (uniqueLocationIds.size !== 0) {
        await Promise.allSettled(
          Array.from(uniqueLocationIds).map(async ([locationId]) => {
            const { data: { name: locationName } } =
              await couponService.fetchLocationById(baseUrl, locationId);
            uniqueLocationIds.set(locationId, locationName);
          })
        );
      }

      const updatedCouponList = coupons.map((coupon: ICoupon) => {
        return {
          ...coupon,
          businessUnit: uniqueBusinessUnitIds.get(coupon.businessUnitId),
          location: uniqueLocationIds.get(coupon.locationId),
        }
      })
      thunkAPI.dispatch(setTotalCount(totalCount));
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.fulfillWithValue(updatedCouponList);
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
  async (_requestPayload: IUpdateCouponPayload, thunkAPI) => {
    try {
      const baseUrl = getBaseUrl(thunkAPI.getState());
      await couponService.updateCoupon(baseUrl, _requestPayload);
      toast.success(COUPON_MESSAGES.COUPON_CREATED);
    } catch ({ statusText }) {
      toast.error(`${statusText}`);
    }
  }
);
