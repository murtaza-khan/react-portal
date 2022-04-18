import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import PrivateRoutes from './private-routes';
import { HealthCheck } from "../pages";

export const Router: React.FC = () => (
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
