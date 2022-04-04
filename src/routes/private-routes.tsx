import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getIsLoggedIn, getUserRole } from '../store/selectors/entities/auth';
import PrivateRoutesConfig from './private-route-config';
import MapAllowedRoutes from './map-allowed-routes';

export function isArrayWithLength(arr: TArrayOfObjects) {
  return (Array.isArray(arr) && arr.length);
}

export function getAllowedRoutes(routes: TObject, role: string) {
  return routes.filter(({ permission } : { permission: string[]}) => {
    if (!permission) return true;
    else if (!isArrayWithLength(permission)) return true;
    return permission.includes(role);
  });
}

const PrivateRoutes = () => {
  let allowedRoutes = [];
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userRole = useSelector(getUserRole);
  if (isLoggedIn) allowedRoutes = getAllowedRoutes(PrivateRoutesConfig, userRole);
  else return <Redirect to='/' />;

  return (
    <Fragment>
      <MapAllowedRoutes
        routes={ allowedRoutes }
        basePath='/app'
        isAddNotFound
      />
    </Fragment>
  );
};

export default PrivateRoutes;
