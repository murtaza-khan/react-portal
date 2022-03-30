import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import PrivateRoutes from './private-routes';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/app'>
        <PrivateRoutes />
      </Route>
      <Route path=''>
        <Auth />
      </Route>
    </Switch>
  </BrowserRouter>
);
