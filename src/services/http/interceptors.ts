import axios from 'axios';
import { logout } from 'src/store/thunks';
import { REFRESH_TOKEN_HEADER } from '../../constants/auth';
import { ERROR_CODES, RESPONSE_TYPES, STATUS_CODES } from '../../constants/response-types';
import { store } from 'src/store';
import { toast } from 'react-toastify';
import { REDIRECTING_TO_LOGIN } from 'src/constants/toast-messages';

axios.interceptors.request.use(async function (req) {
  return req;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if (response.headers[REFRESH_TOKEN_HEADER]) {
    // TODO: dispatch to set user token
  }

  return response;
}, error => {
  if (
    axios.isCancel(error) ||
    error?.message === RESPONSE_TYPES.NETWORK_ERROR ||
    (error?.response?.status === STATUS_CODES.REQUEST_TIMEOUT || error?.code === ERROR_CODES.ECONNABORTED)
  ) {
    return Promise.reject({ noInternet: true });
  }

  if (error?.response?.status === STATUS_CODES.UNAUTHORIZED) {
    toast.info(REDIRECTING_TO_LOGIN);
    setTimeout(() => {
      store.dispatch<any>(logout({}));
    }, 4000);
  }

  return Promise.reject(error);
});
