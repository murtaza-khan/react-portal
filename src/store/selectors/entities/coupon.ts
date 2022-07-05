/* eslint-disable padding-line-between-statements */
import get from 'lodash.get';
import { createSelector } from 'reselect';
import { getDateWithOutTime, getFormattedDate, getRowCount } from 'src/utils/common';
import { getCouponsPage, getCouponPerPage } from 'src/store/selectors/features/coupon';

const couponEntitySelector = (state: TReduxState) => state.entities.coupon;

export const getCouponData = createSelector(couponEntitySelector, coupon => get(coupon, 'data', []));

const getCouponStatus = (disabled: boolean, startDate: isDateOrString, endDate: isDateOrString) => {
  const today = getDateWithOutTime(new Date());
  if (today > endDate) {
      return "Expired";
  }
  else if (disabled) {
      return "Disabled";
  }
  else if (startDate > today) {
      return "In Active";
  }
  else {
      return "Active";
  }

}

export const getCouponList = (state: TReduxState) => {
  const couponData = getCouponData(state);
  const itemsPerPage = getCouponPerPage(state);
  const currentPage = getCouponsPage(state);
  const updatedCouponList = couponData?.map((coupon: ICoupon, index: number) => {
    const { id, name, businessUnit, location, disabled, startDate, endDate } = coupon;
    const rowCount = getRowCount(
      itemsPerPage,
      currentPage,
      index
    );
    const formattedStartDate = getFormattedDate(startDate);
    const formattedEndDate = getFormattedDate(endDate);
    const status = getCouponStatus(disabled, formattedStartDate, formattedEndDate);
    return {
      type: 'MASTER',     // Used in datagrid
      expanded: false,    // Used in datagrid
      number: rowCount,
      id,
      name,
      businessUnit,
      location,
      status,
    }
  }) ?? []
  return updatedCouponList;
};

export const getCouponDetail = (state: TReduxState, id: number) => {
  const couponData = getCouponData(state);
  const couponDetail = couponData?.find((coupon: ICoupon) => coupon.id === id);
  return couponDetail;
};

