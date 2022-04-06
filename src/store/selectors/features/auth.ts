import { createSelector } from 'reselect';
import { ROLES } from '../../../constants/roles';
/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const authEntitySelector = (state: TReduxState) => state.features.auth;

export const getIsLoggedIn = createSelector(authEntitySelector, app => app.data);

export const getUserData = createSelector(getIsLoggedIn, (userLoggedIn: any) => userLoggedIn.user);

export const getUserRoleData = createSelector(getUserData, (userData: any) => userData.role);

export const getUserRoleName = createSelector(getUserRoleData, (userRoleData: any) => userRoleData.name);


// Need to be Verified, may not work as expected
export const getIsAdmin = createSelector(getIsLoggedIn, (data: any) => data && data?.role === ROLES.ADMIN);

export const getIsCustomer = createSelector(getIsLoggedIn, (data: any) => data && data?.role === ROLES.CUSTOMER);
