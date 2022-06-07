import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/auth/login';

const PublicRoutes = () => (<Fragment>
  <Switch>
    <Route path='/login'>
      <Login />
    </Route>
    <Route path='/' exact>
      <Login />
    </Route>
  </Switch>
</Fragment>);

export default PublicRoutes;
