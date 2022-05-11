/* eslint-disable keyword-spacing */
import { AUTH_COOKIE, DEV_AUTH_COOKIE, PROD_AUTH_COOKIE, QA_AUTH_COOKIE, STAGE_AUTH_COOKIE } from 'src/constants/auth';
import { BUILD_ENV } from './../constants/build-env';
import Cookies from 'js-cookie';

export const checkLoginApiData = (apiData: any) => {
  if (!apiData.username || !apiData.username.trim()) {
    return { ok: false, error: 'Email required' };
  }

  if (!apiData.password) {
    return { ok: false, error: 'Password required' };
  }

  return { ok: true };
}

export const getAuthCookieName = (env: string | undefined): string => {
  switch (env) {
    case BUILD_ENV.DEVELOPMENT:
      return DEV_AUTH_COOKIE;
    case BUILD_ENV.STAGING:
      return STAGE_AUTH_COOKIE;
    case BUILD_ENV.QA:
      return QA_AUTH_COOKIE;
    case BUILD_ENV.PRODUCTION:
      return PROD_AUTH_COOKIE;
    default:
      return AUTH_COOKIE;
  }
}

export const checkTokenOnReroute = () => {
  let reroute = false
  window.addEventListener("pageshow", function (event) {
    if (event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2)) {
      let data = { token: '' };
      const stringData = Cookies.get(getAuthCookieName(process.env.REACT_APP_ENV))!;

      if (stringData && stringData.length > 0) {
        data = JSON.parse(stringData!);
      }

      const { token } = data;

      if (!(token && token.length > 0)) {
        reroute = true;
      }
    }
  });
  return reroute;
}
