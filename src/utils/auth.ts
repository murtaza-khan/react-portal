/* eslint-disable keyword-spacing */
import { AUTH_COOKIE, DEV_AUTH_COOKIE, PROD_AUTH_COOKIE, QA_AUTH_COOKIE, STAGE_AUTH_COOKIE } from 'src/constants/auth';
import { BUILD_ENV } from 'src/constants/build-env';
import { AUTH_MESSAGES } from 'src/constants/toast-messages';

export const checkLoginApiData = (apiData: any) => {
  if (!apiData.username || !apiData.username.trim()) {
    return { ok: false, error: AUTH_MESSAGES.EMAIL_REQUIRED };
  }

  if (!apiData.password) {
    return { ok: false, error: AUTH_MESSAGES.PASSWORD_REQUIRED };
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
