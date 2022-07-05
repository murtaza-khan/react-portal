import { COUPON_MESSAGES } from 'src/constants/toast-messages';

export const checkCreateApiData = (apiData: any) => {
  if (!apiData.name || !apiData.name.trim()) {
    return { ok: false, error: COUPON_MESSAGES.COUPON_NAME_REQUIRED }
  }

  if (apiData.endDate && apiData.startDate) {
    const startDate = new Date(apiData.startDate).getTime()
    const endDate = new Date(apiData.endDate).getTime()

    if (endDate < startDate) {
      return { ok: false, error: COUPON_MESSAGES.END_DATE_AFTER_START_DATE }
    }
  } else {
    return { ok: false, error: COUPON_MESSAGES.DATES_REQUIRED }
  }

  if (!apiData.discountValue || apiData.discountValue < 0) {
    return { ok: false, error: COUPON_MESSAGES.DISCOUNT_VALUE_REQUIRED }
  }

  if (apiData.maxDiscountValue < 0) {
    return { ok: false, error: COUPON_MESSAGES.MAX_DISCOUNT_VALUE_POSITIVE }
  }

  if (apiData.minCouponLimit < 0) {
    return { ok: false, error: COUPON_MESSAGES.MIN_COUPON_LIMIT_POSITIVE }
  }

  if (apiData.discountValue < 0) {
    return { ok: false, error: COUPON_MESSAGES.DISCOUNT_VALUE_POSITIVE }
  }

  if (!apiData.businessUnitId) {
    return { ok: false, error: COUPON_MESSAGES.BUSINESS_UNIT_REQUIRED }
  }

  if (!apiData.locationId) {
    return { ok: false, error: COUPON_MESSAGES.LOCATION_REQUIRED }
  }

  if (apiData.discountTypeId === 1) {
    if (apiData.discountValue > 100) {
      return { ok: false, error: COUPON_MESSAGES.DISCOUNT_VALUE_LESS_THAN_100 }
    }
  }

  if (apiData.couponCustomerOptionId === 2 && apiData.couponCustomers?.length === 0) {
    return { ok: false, error: COUPON_MESSAGES.NO_CUSTOMER_SELECTED }
  }

  if (apiData.productsListType != 0 && !apiData.productIds) {
    return { ok: false, error: COUPON_MESSAGES.UPLOAD_PRODUCT_FILE }
  }

  return { ok: true };
}
