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
  // const isAdmin = useSelector(getIsAdmin);
  // TODO: temp logged-in check, update as per your app logic
  return loggedIn ? (
    // <Redirect to={ isAdmin ? '/app/dashboard' : '/app/profile' } />
    <Redirect to={ '/coupon' } />
  ) : (
    <PublicRoutes />
  );
};

export default memo(Auth);
