export const checkCreateApiData = (apiData: any) => {
  if (!apiData.name || !apiData.name.trim()) {
    return { ok: false, error: 'Coupon Name required'}
  }

  if ( apiData.endDate && apiData.startDate) {
    const startDate = new Date(apiData.startDate).getTime()
    const endDate = new Date(apiData.endDate).getTime()

    if ( endDate < startDate) {
      return { ok: false, error: 'End Date must not be before start date'}
    }
  } else {
    return { ok: false, error: 'Start & End Dates are required'}
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

  if (apiData.discountTypeId === 1) {
    if (apiData.discountValue > 100) {
      return { ok: false, error: 'Discount value for percentage coupon can not be greater than 100'}
    }
  }

  return { ok: true };
}