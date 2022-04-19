/* eslint-disable padding-line-between-statements */
import get from 'lodash.get';
import { createSelector } from 'reselect';

const customerEntitySelector = (state: TReduxState) => state.entities.customer;

export const getCustomerIds = createSelector(customerEntitySelector, state => get(state, 'data', []));