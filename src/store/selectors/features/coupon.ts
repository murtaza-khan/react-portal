import get from 'lodash.get';
import { createSelector } from 'reselect';

/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const couponFeatureSelector = (state: TReduxState) => state.features.coupon;

export const getCouponData = createSelector(couponFeatureSelector, coupon => get(coupon, 'data', null));

export const getCouponsPage = createSelector(getCouponData, couponData => get(couponData, 'page', 1));

export const getCouponPerPage = createSelector(getCouponData, couponData => get(couponData, 'perPage', 10));

export const getTotalCount = createSelector(getCouponData, couponData => get(couponData, 'totalCount', 0));

export const getCouponValidationStates = createSelector(couponFeatureSelector, coupon => get(coupon, 'validationStates', null));

export const getIsLoading = createSelector(getCouponValidationStates, validationStates => get(validationStates, 'isLoading', false));
