export enum ROUTES  {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD'
  // more routes will be added here
}

export const ADMIN_PORTAL_URL = process.env.REACT_APP_ADMIN_PORTAL_URL;
export const LOYALTY_PORTAL_URL = process.env.REACT_APP_LOYALTY_PORTAL_URL;

//Sidebar Route Names
export enum SIDEBAR_NAMES {
  PRODUCTS = 'Products',
  CATALOGUES = 'Catalogues',
  ORDERS = 'Orders',
  BATCHES = 'Batches',
  CATEGORIES = 'Categories',
  INVENTORY = 'Inventory',
  COUPON = 'Coupon',
  USERS = 'Users',
  CUSTOMERS = 'Customers',
  NOTIF_CENTER = 'Notification center',
  LOCATION = 'Location',
  BANNERS = 'Banners',
  BNPL_TRANSACTIONS = 'BNPL Transactions',
  MAILING_LISTS = 'Mailing Lists',
  REWARDS = 'Rewards',
  HIERARCHY = 'Hierarchy',
  SETTINGS = 'Settings',
}
