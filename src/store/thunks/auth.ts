import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth';
import { getBaseUrl } from '../selectors/features/app';
import { showAlert } from "../slices/features/alerts";
import { AlertTypes } from "src/constants/alert-types";
import { LocalStorageService } from "../../services/local-storage";
import { toast } from 'react-toastify';
import { setAuthToken } from "../slices/features/auth";

/**
 * Just an example below that how we will create asynchronous actions
 * Mostly these actions used to make an Api call and returns response to the reducers
 * to update the data in the reducers
 */

const authService = new AuthService();
const localStorageService = new LocalStorageService();

export const login = createAsyncThunk<TObject, TObject, IActionOptions>(
  "auth/Login",
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    const baseUrl = getBaseUrl(thunkAPI.getState());
    const response = await authService.signIn(`${baseUrl}`, _requestPayload);

    if (response.error) {
      thunkAPI.dispatch(
        showAlert({ message: "Invalid credentials", type: AlertTypes.ERROR })
      );
      toast.error("Invalid credentials");
      return thunkAPI.rejectWithValue({ ...response.data });
    }

    thunkAPI.dispatch(
      showAlert({ message: "Logged in successfully", type: AlertTypes.SUCCESS })
    );
    toast.success("Logged in successfully");
    localStorageService.persist("token", response?.data?.token);
    thunkAPI.dispatch(setAuthToken(response?.data?.token));

    return thunkAPI.fulfillWithValue(response.data);
  }
);

export const logout = createAsyncThunk<TObject, TObject, IActionOptions>(
  'auth/Logout',
  async (_requestPayload: Record<string, string>, thunkAPI) => {
    const response = await authService.signOut();
    thunkAPI.fulfillWithValue({ payload: _requestPayload});
    return response?.data;
  }
);
