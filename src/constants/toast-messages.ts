export const REDIRECTING_TO_LOGIN = 'Redirecting to Login Page';

export enum AUTH_MESSAGES {
  // Form Validation Messages
  EMAIL_REQUIRED = 'Email required',
  PASSWORD_REQUIRED = 'Password required',
  // Thunks
  INVALID_CREDENTIALS = 'Invalid credentials',
  LOGGED_IN = 'Logged in successfully',
}

export enum COUPON_MESSAGES {
  // Form Validation Messages - Inside checkCreateApiData
  COUPON_NAME_REQUIRED = 'Coupon Name required',
  END_DATE_AFTER_START_DATE = 'End Date must not be before start date',
  DATES_REQUIRED = 'Start & End Dates are required',
  DISCOUNT_VALUE_REQUIRED = 'Coupon Discount Value required',
  MAX_DISCOUNT_VALUE_POSITIVE = 'Coupon Max Discount must be a positive or zero',
  MIN_COUPON_LIMIT_POSITIVE = 'Min Coupon Limit must be a positive or zero',
  DISCOUNT_VALUE_POSITIVE = 'Discount value must be a positive or zero',
  BUSINESS_UNIT_REQUIRED = 'Coupon Business Unit Required',
  LOCATION_REQUIRED = 'Location Required',
  DISCOUNT_VALUE_LESS_THAN_100 = 'Discount value for percentage coupon can not be greater than 100',
  NO_CUSTOMER_SELECTED = 'No customers selected',
  UPLOAD_PRODUCT_FILE = 'Please upload product file',
  // Form Validation Messages - Others
  SELECT_COUPON_LOCATION = 'Please select location for coupon first',
  INVALID_FILE_FORMAT = 'Invalid file format! Please upload the file with .csv extension.',
  SELECT_CUSTOMER = 'Select atleast one customer for coupon',
  // Thunks
  COUPON_CREATED = 'Coupon created successfully',
}
