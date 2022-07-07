export enum COUPON_STATUS {
  EXPIRED = 'Expired',
  DISABLED = 'Disabled',
  IN_ACTIVE = 'In Active',
  ACTIVE = 'Active',
}

export enum FORM_FIELDS {
  NAME = 'Name',
  START_DATE = 'Start Date',
  END_DATE = 'End Date',
  DESCRIPTION = 'Description',
  DESCRIPTION_SMALL = ' [Use "|" for line break and "|-" for bullet points]',
  LANGUAGES = 'Languages',
  LANGUAGE_DESCRIPTION = 'Language Description',
  COUPON_TYPE = 'Coupon Type',
  COUPON_USER = 'Coupon User',
  DISCOUNT_VALUE = 'Discount Value',
  MIN_COUPON_LIMIT = 'Min Coupon Limit',
  MIN_DICOUNT_LIMIT = 'Coupon Min Discount Limit',
  MAX_DISCOUNT_VALUE = 'Max Discount Value',
  COUPON_MAX_USAGE = 'Coupon Max Usage',
  CUSTOMER_ELIGIBILITY = 'Customer Eligibility',
  COUPON_DISABLE_ENABLE = 'Disable/Enable Coupon',
  DISABLE = 'Disable',
  ENABLE = 'Enable',
  COUPON_HIDE_SHOW = 'Hide/Show on Coupon Wallet',
  HIDE = 'Hide',
  SHOW = 'Show',
  SELECT_BUSINESS_UNIT = 'Select Business Unit',
  SELECT_LOCATION = 'Select Location',
  SELECTED_CUSTOMERS = 'Selected Customers',
  UPLOAD_FILE = 'Upload Customer File',
  SKU_ELIGIBILITY = 'SKU Eligibility',
}

const COUPON_TYPES = [
  {
    name: 'Percentage Discount',
    id: 1,
  },
  {
    name: 'Fixed Amount',
    id: 2,
  },
];

const COUPON_USERS = [
  {
    name: 'Consumer',
    id: 1,
    value: '[8]',
  },
  {
    name: 'Supervisor',
    id: 2,
    value: '[16]',
  },
  {
    name: 'Both',
    id: 3,
    value: '[8,16]',
  },
];

export {
  COUPON_TYPES,
  COUPON_USERS,
};
