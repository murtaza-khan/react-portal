import get from 'lodash.get';
import { createSelector } from 'reselect';

/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const appEntitiesSelector = (state: TReduxState) => state.entities.app;

export const getAppData = createSelector(appEntitiesSelector, app => get(app, 'data', null));

export const getAllCompanies = createSelector(getAppData, appData => get(appData, 'companies', []));

export const getBusinessUnits = createSelector(getAppData, appData => get(appData, 'businessUnits', []));

export const getAllLocations = createSelector(getAppData, appData => get(appData, 'locations', []));

export const getCustomersByLocation = createSelector(getAppData, appData => get(appData, 'customers', []));

export const getCustomersTotalCount = createSelector(getAppData, appData => get(appData, 'totalCustomers', 0));
