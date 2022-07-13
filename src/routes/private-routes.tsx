import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getIsLoggedIn, getUserRoleId } from '../store/selectors/features/auth';
import PrivateRoutesConfig from './private-route-config';
import MapAllowedRoutes from './map-allowed-routes';
import { useReroute } from 'src/hooks/useReroute';
import { SIDEBAR_ROUTES } from 'src/constants/navigation-routes';

export function isArrayWithLength(arr: TArrayOfObjects) {
  return Array.isArray(arr) && arr.length;
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
  useReroute();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const userRoleId = useSelector(getUserRoleId);
  if (isLoggedIn) allowedRoutes = getAllowedRoutes(PrivateRoutesConfig, userRoleId);
  else return <Redirect to='/' />;

  return (
    <Fragment>
      <MapAllowedRoutes
        routes={ allowedRoutes }
        basePath={ SIDEBAR_ROUTES.COUPON}
        isAddNotFound
      />
    </Fragment>
  );
};

export default PrivateRoutes;
