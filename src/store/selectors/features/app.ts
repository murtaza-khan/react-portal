import get from 'lodash.get';
import { createSelector } from 'reselect';

/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const appFeatureSelector = (state: TReduxState) => state.features.app;

export const getAppActiveScreen = createSelector(appFeatureSelector, app => get(app, 'activeScreen', ''));

export const getAppLanguage = createSelector(appFeatureSelector, app => get(app, 'language', ''));

export const getBaseUrl = createSelector(appFeatureSelector, _app => 'https://dev.retailo.me');
// get(app, 'baseUrl', ''));

export const getSelectedBusinessUnitId = createSelector(appFeatureSelector, app => get(app, 'selectedBusinessUnitId', ''));

export const getSelectedLocationId = createSelector(appFeatureSelector, app => get(app, 'selectedLocationId', ''));

export const getSearchValue = createSelector(appFeatureSelector, app => get(app, 'searchValue', ''));

export const getIsCustomerLoading = createSelector(appFeatureSelector, app => get(app, 'customer.status', '') === 'pending');

export const getCustomerPerPage = createSelector(appFeatureSelector, app => get(app, 'customer.perPage', 20));

export const getCustomerTotalCount = createSelector(appFeatureSelector, app => get(app, 'customer.totalCount', 0));

export const getCustomerPage = createSelector(appFeatureSelector, app => get(app, 'customer.page', 1));
export const getSelectedCustomers = createSelector(appFeatureSelector, app => get(app, 'selectedCustomers', []));

export const getSelectedCustomers = createSelector(appFeatureSelector, app => get(app, 'selectedCustomers', []));


export const getAppValidationStates = createSelector(appFeatureSelector, app => get(app, 'validationStates', {}));

export const getAppLoadingState =
  createSelector(getAppValidationStates, validationStates => get(validationStates, 'isLoading', false));
