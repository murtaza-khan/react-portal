import { STATUS_MESSAGES } from './../../constants/response-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppService } from 'src/services';
import {
  getBaseUrl,
  getSearchValue,
  getSelectedBusinessUnitId,
  getSelectedCompanyId,
  getSelectedLocationId,
} from '../selectors/features/app';
import {
  getCustomerPage,
  getCustomerPerPage,
  getCustomerFilter,
} from '../selectors/features/app';
import { fetchCoupons } from 'src/store/thunks';
import { toast } from 'react-toastify';
import { getCouponsPage } from '../selectors/features/coupon';
import {
  updateSearchValue,
  updateSelectedBusinessUnitId,
  updateSelectedCompanyId,
  updateSelectedLocationId,
} from '../slices/features/app';
import { updateCurrentPage } from '../slices/features/coupon';
import {
  APP_FETCH_ALL_COMPANIES,
  APP_FETCH_BUSINESS_UNITS,
  APP_FETCH_ALL_LOCATIONS,
  APP_FETCH_CUSTOMERS_BY_LOCATION,
} from 'src/store/action-types';

/**
 * Just an example below that how we will create asynchronous actions
 * Mostly these actions used to make an Api call and returns response
 * to the reducers to update the data in the reducers
 */

const appService = new AppService();

export const fetchAllCompanies =
  createAsyncThunk<TObject, TObject, IActionOptions>(
    APP_FETCH_ALL_COMPANIES,
    async (_: allAnyTypes, thunkAPI) => {
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

export const fetchBusinessUnits =
  createAsyncThunk<TObject, TObject, IActionOptions>(
    APP_FETCH_BUSINESS_UNITS,
    async (companyId: string, thunkAPI) => {
      try {
        const baseUrl = getBaseUrl(thunkAPI.getState());

        const { data } = await appService.fetchBusinessUnits(
          baseUrl, companyId
        );

        return thunkAPI.fulfillWithValue(data);
      } catch ({ statusText }) {
        toast.error(`${statusText}`);
        return thunkAPI.rejectWithValue(statusText);
      }
    }
  );

export const fetchAllLocations =
  createAsyncThunk<TObject, TObject, IActionOptions>(
    APP_FETCH_ALL_LOCATIONS,
    async (_requestPayload: Record<string, string>, thunkAPI) => {
      try {
        const baseUrl = getBaseUrl(thunkAPI.getState());
        const { companyId, businessUnitId } = _requestPayload;

        const { data } = await appService.fetchAllLocations(
          baseUrl, companyId, businessUnitId
        );

        return thunkAPI.fulfillWithValue(data);
      } catch ({ statusText }) {
        toast.error(`${statusText}`);
        return thunkAPI.rejectWithValue(statusText);
      }
    }
  );

export const fetchCustomersByLocation =
  createAsyncThunk<TObject, TObject, IActionOptions>(
    APP_FETCH_CUSTOMERS_BY_LOCATION,
    async (_, thunkAPI) => {
      try {
        const baseUrl = getBaseUrl(thunkAPI.getState());
        const pageNo = getCustomerPage(thunkAPI.getState());
        const perPage = getCustomerPerPage(thunkAPI.getState());
        const searchValue = getCustomerFilter(thunkAPI.getState());

        const payload = {
          perPage,
          pageNo,
          ...searchValue && {searchValue, searchOnAttributes: 'name,phone'},
        };

        const response = await appService.fetchAllCustomers(baseUrl, payload);
        return thunkAPI.fulfillWithValue(response.data);
      } catch (err) {
        return thunkAPI.rejectWithValue(STATUS_MESSAGES.SEEMS_TO_BE_ERROR)
      }
    }
  );

export const fetchInitialData = () =>
  async (dispatch: allAnyTypes): Promise<allAnyTypes> => {
    dispatch(fetchAllCompanies({}));
    dispatch(fetchCoupons({}));
  };


export const handleRefresh = () =>
  async (dispatch: allAnyTypes, getState: allAnyTypes)
  : Promise<allAnyTypes> => {
    const selectedCompanyId = getSelectedCompanyId(getState());
    const selectedBusinessUnitId = getSelectedBusinessUnitId(getState());
    const selectedLocationId = getSelectedLocationId(getState());
    const searchValue = getSearchValue(getState());
    const currentPage = getCouponsPage(getState());

    selectedCompanyId && dispatch(updateSelectedCompanyId(''));
    selectedBusinessUnitId && dispatch(updateSelectedBusinessUnitId(''));
    selectedLocationId && dispatch(updateSelectedLocationId(''));
    searchValue && dispatch(updateSearchValue(''));
    currentPage !== 1 && dispatch(updateCurrentPage(1));
    dispatch(fetchInitialData());
  };
