import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LOGIN_ROUTE } from 'src/constants/navigation-routes';
import Login from '../pages/auth/login';

const PublicRoutes = () => (<Fragment>
  <Switch>
    <Route path={ LOGIN_ROUTE }>
      <Login />
    </Route>
    <Route path='/' exact>
      <Login />
    </Route>
  </Switch>
</Fragment>);

export default PublicRoutes;
