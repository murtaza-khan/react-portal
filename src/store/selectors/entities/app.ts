import get from 'lodash.get';
import { createSelector } from 'reselect';
import { getCustomerPerPage, getCustomerPage } from '../features/app';
import { getRowCount } from 'src/utils/common';

/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const appEntitiesSelector = (state: TReduxState) => state.entities.app;

export const getAppData = createSelector(appEntitiesSelector, app => get(app, 'data', null));

export const getAllCompanies = createSelector(getAppData, (appData) =>
  get(appData, 'companies', [])
);

export const getBusinessUnits = createSelector(getAppData, (appData) =>
  get(appData, 'businessUnits', [])
);

export const getAllLocations = createSelector(getAppData, (appData) =>
  get(appData, 'locations', [])
);

export const getCustomersByLocation = createSelector(getAppData, (appData) =>
  get(appData, 'customers', [])
);

export const getCustomerList = (state: TReduxState) => {
  const customerData = getCustomersByLocation(state);
  const itemsPerPage = getCustomerPerPage(state);
  const currentPage = getCustomerPage(state);

  const updatedCustomerList =
    customerData?.map((customer: allAnyTypes, index: number) => {
      const rowCount = getRowCount(itemsPerPage, currentPage, index);
      return {
        ...customer,
        number: rowCount,
      };
    }) ?? [];

  return updatedCustomerList;
};

