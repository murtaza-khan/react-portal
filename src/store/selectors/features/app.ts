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

export const getBaseUrl = createSelector(appFeatureSelector, app => get(app, 'baseUrl', ''));

export const getSelectedBusinessUnitId = createSelector(appFeatureSelector, app => get(app, 'selectedBusinessUnitId', ''));

export const getSelectedLocationId = createSelector(appFeatureSelector, app => get(app, 'selectedLocationId', ''));

export const getSearchValue = createSelector(appFeatureSelector, app => get(app, 'searchValue', ''));

export const getAppValidationStates = createSelector(appFeatureSelector, app => get(app, 'validationStates', {}));

export const getAppLoadingState =
  createSelector(getAppValidationStates, validationStates => get(validationStates, 'isLoading', false));

/**
 * For local development
 */

// export const getBaseUrl = (thunkApi: any) => {
//   thunkApi;
//   return "https://dev.retailo.me"
// };
