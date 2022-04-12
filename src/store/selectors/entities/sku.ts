/* eslint-disable padding-line-between-statements */
import get from 'lodash.get';
import { createSelector } from 'reselect';

const skuEntitySelector = (state: TReduxState) => state.entities.sku;

export const getSkuIds = createSelector(skuEntitySelector, state => get(state, 'data', []));
