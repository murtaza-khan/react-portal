import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth';
import { getBaseUrl } from '../selectors/features/app';
import { showAlert } from "../slices/features/alerts";
import { AlertTypes } from "src/constants/alert-types";
import { LocalStorageService } from "../../services/local-storage";
import { toast } from 'react-toastify';

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
    // const baseUrl = getBaseUrl(thunkAPI.getState());
    const baseUrl = "https://dev.retailo.me";
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
    localStorageService.persist("authToken", response?.data?.token);

    return thunkAPI.fulfillWithValue(response.data);
  }
);

export const logout = createAsyncThunk<TObject, TObject, IActionOptions>(
  'auth/Logout',
  async (_requestPayload: Record<string, string>, thunkAPI) => {
  // Example of an API call to fetch the app-data
    // const baseUrl = getBaseUrl(thunkAPI.getState());
    const response = await authService.signOut();
    thunkAPI.fulfillWithValue({ payload: _requestPayload});
    // const response = { data: null, error: { message: 'API failed with status 400' }}; // example response
    // if (response.error) {
    //   return thunkAPI.rejectWithValue({ ...response.error });
    // }

    return response?.data;
  }
);
