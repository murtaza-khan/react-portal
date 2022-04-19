import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import PrivateRoutes from './private-routes';
import { HealthCheck } from "../pages";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/slices/features/auth";
import { LocalStorageService } from '../services/local-storage';

export const Router: React.FC = () => {
  const localStorageService = new LocalStorageService();
  const authToken = window.location?.href?.split("token=")[1];

  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      localStorageService.persist("token", authToken);
      dispatch(setAuthToken(authToken));
    }
  }, [authToken]);

  return (
    <BrowserRouter basename="/couponportal">
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
    </BrowserRouter>
  );
};
