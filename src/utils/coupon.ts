export const checkCreateApiData = (apiData: any) => {
  if (!apiData.name || !apiData.name.trim()) {
    return { ok: false, error: 'Coupon Name required'}
  }

  if (!apiData.discountValue || apiData.discountValue < 0) {
    return { ok: false, error: 'Coupon Discount Value required'}
  }

  if (apiData.maxDiscountValue < 0) {
    return { ok: false, error: 'Coupon Max Discount must be a positive or zero'}
  }

  if (apiData.minCouponLimit < 0) {
    return { ok: false, error: 'Min Coupon Limit must be a positive or zero'}
  }

  if (apiData.discountValue < 0) {
    return { ok: false, error: 'Discount value must be a positive or zero'}
  }

  if (!apiData.businessUnitId) {
    return { ok: false, error: 'Coupon Business Unit Required'}
  }

  if (!apiData.locationId) {
    return { ok: false, error: 'Location Required'}
  }

  return { ok: true };
}