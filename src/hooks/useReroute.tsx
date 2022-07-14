import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from 'src/store/slices/features/auth';
import { handleRefresh } from 'src/store/thunks';
import { getAuthCookieName } from 'src/utils/auth';

export const useReroute = () => {
  const dispatch = useDispatch();

  const _handleBrowserBack = (event: PageTransitionEvent) => {
    if (event.persisted || typeof window.performance !== 'undefined' && window.performance.navigation.type === 2) {

      let data = { token: '' };
      const stringData = Cookies.get(getAuthCookieName(process.env.REACT_APP_ENV));

      if (stringData && stringData.length > 0) {
        data = JSON.parse(stringData);
      }

      const { token } = data;

      if (!(token && token.length > 0)) {
        dispatch(setAuthData({ token: '', user: {} }));
      } else {
        dispatch(handleRefresh())
      }

    }
  }

  useEffect(() => {
    window.addEventListener('pageshow', _handleBrowserBack);

    return () => {
      window.removeEventListener('pageshow', _handleBrowserBack);
    };
  }, []);

};
