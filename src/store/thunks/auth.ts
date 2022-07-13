import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/services';
import { getBaseUrl } from '../selectors/features/app';
import { showAlert } from '../slices/features/alerts';
import { ALERT_TYPES } from 'src/constants/alert-types';
import { toast } from 'react-toastify';
import { setAuthToken } from '../slices/features/auth';
import Cookies from 'js-cookie';
import { getAuthCookieName } from 'src/utils/auth';
import { AUTH_MESSAGES } from 'src/constants/toast-messages';
import { AUTH_LOGIN, AUTH_LOGOUT } from 'src/store/action-types';


/**
 * Just an example below that how we will create asynchronous actions
 * Mostly these actions used to make an Api call and returns response
 * to the reducers to update the data in the reducers
 */

const authService = new AuthService();

export const login = createAsyncThunk<TObject, TObject, IActionOptions>(
  AUTH_LOGIN,
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    const baseUrl = getBaseUrl(thunkAPI.getState());
    const response = await authService.signIn(`${baseUrl}`, _requestPayload);

    if (response.error) {
      thunkAPI.dispatch(
        showAlert({
          message: AUTH_MESSAGES.INVALID_CREDENTIALS,
          type: ALERT_TYPES.ERROR,
        })
      );
      toast.error(AUTH_MESSAGES.INVALID_CREDENTIALS);
      return thunkAPI.rejectWithValue({ ...response.data });
    }

    thunkAPI.dispatch(
      showAlert({ message: AUTH_MESSAGES.LOGGED_IN, type: ALERT_TYPES.SUCCESS })
    );
    toast.success(AUTH_MESSAGES.LOGGED_IN);
    Cookies.set(
      getAuthCookieName(process.env.REACT_APP_ENV),
      JSON.stringify(response.data)
    );
    thunkAPI.dispatch(setAuthToken(response?.data?.token));

    return thunkAPI.fulfillWithValue(response.data);
  }
);

export const logout = createAsyncThunk<TObject, TObject, IActionOptions>(
  AUTH_LOGOUT,
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    const response = await authService.signOut();
    thunkAPI.dispatch(setAuthToken(''));
    thunkAPI.fulfillWithValue({ payload: _requestPayload});
    return response?.data;
  }
);
