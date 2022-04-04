import { createSelector } from 'reselect';
import { ROLES } from '../../../constants/roles';
/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const authEntitySelector = (state: TReduxState) => state.entities.auth;

export const getIsLoggedIn = createSelector(authEntitySelector, app => app.data);

export const getIsAdmin = createSelector(getIsLoggedIn, (data: any) => data && data?.role === ROLES.ADMIN);

export const getIsCustomer = createSelector(getIsLoggedIn, (data: any) => data && data?.role === ROLES.CUSTOMER);

export const getUserRole = createSelector(getIsLoggedIn, (data: any) => data?.role);
