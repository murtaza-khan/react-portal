import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../store/selectors/features/auth';
import PublicRoutes from './public-routes';

/*
* TODO: when user loggedIn he/she unable to goto public routes
*  ie: ('/about', '/contact', 'any other public route')
*/
const Auth = () => {
  const loggedIn = useSelector(getIsLoggedIn);
  return loggedIn ? (
    <Redirect to={ '/coupon' } />
  ) : (
    <PublicRoutes />
  );
};

export default memo(Auth);
