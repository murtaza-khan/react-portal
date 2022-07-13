import get from 'lodash.get';
import { createSelector } from 'reselect';
import { ROLES } from '../../../constants/roles';
/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const authEntitySelector = (state: TReduxState) => state.features.auth;

export const getData = createSelector(authEntitySelector, (app) => get(app, 'data', null))

export const getAuthToken = createSelector(getData, (data) => get(data, 'token', ''))

export const getIsLoggedIn = createSelector(getAuthToken, (authToken) => authToken.length > 0);

export const getUserData = createSelector(getData, userLoggedIn => get(userLoggedIn, 'user', null));

export const getUserRoleData = createSelector(getUserData, userData => get(userData, 'role', null));

export const getUserRoleName = createSelector(getUserRoleData, userRoleData => get(userRoleData, 'name', ''));

export const getUserRoleId = createSelector(getUserRoleData, userRoleData => get(userRoleData, 'id', null));


// Need to be Verified, may not work as expected
export const getIsAdmin = createSelector(getData, (data: allAnyTypes) => data && data?.role === ROLES.ADMIN);
