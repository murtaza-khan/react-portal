import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/auth/login';
// import { Welcome } from '../components/welcome';
import { Todos } from 'src/pages/Todos';
import { CreateTodo } from 'src/pages/createTodo';

const PublicRoutes = () => (<Fragment>
  <Switch>
    <Route path='/login'>
      <Login />
    </Route>
    <Route path='/create'>
      <CreateTodo />
    </Route>
    <Route path='/todos' exact>
      <Todos />
    </Route>
    <Route path='/' exact>
      <Login />
    </Route>
  </Switch>
</Fragment>);

export default PublicRoutes;
