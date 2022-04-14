import get from 'lodash.get';
import { createSelector } from 'reselect';

/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const appEntitySelector = (state: TReduxState) => state.entities.app;

export const getAppData = createSelector(appEntitySelector, app => get(app, 'data', null));

export const getAllCompanies = createSelector(getAppData, appData => get(appData, 'companies', []));

export const getBusinessUnits = createSelector(getAppData, appData => get(appData, 'businessUnits', []));

export const getAllLocations = createSelector(getAppData, appData => get(appData, 'locations', []));
