import React, { useEffect } from "react";
import { Router, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import PrivateRoutes from './private-routes';
import { HealthCheck } from "../pages";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/slices/features/auth";
import { LocalStorageService } from '../services/local-storage';
import history from "src/utils/history";
import { getAuthCookieName } from 'src/utils/auth';
import Cookies from 'js-cookie';

export const RouterComponent: React.FC = () => {
  const localStorageService = new LocalStorageService();
  let data = { token: '', user: {} };
  const stringData = Cookies.get(getAuthCookieName(process.env.REACT_APP_ENV))!;

  if (stringData && stringData.length > 0) {
    data = JSON.parse(stringData!);
  }

  const { token } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    if (token.length > 0) {
      localStorageService.persist("token", token);
      dispatch(setAuthToken(token));
    }
  }, [token, dispatch]);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/health">
          <HealthCheck />
        </Route>
        <Route path='/coupon'>
          <PrivateRoutes />
        </Route>
        <Route path=''>
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};
