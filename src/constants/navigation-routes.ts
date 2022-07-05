export enum ROUTES  {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD'
  // more routes will be added here
}

export const ADMIN_PORTAL_URL = process.env.REACT_APP_ADMIN_PORTAL_URL;

export const MAIN_ROUTE = '/couponportal';
export const ADD_ROUTE = '/add';
export const LOGIN_ROUTE = '/login';

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
  HIERARCHY = 'Hierarchy',
  SETTINGS = 'Settings',
}

export enum SIDEBAR_ROUTES {
  PRODUCTS = '/product',
  CATALOGUES = '/catalogue',
  ORDERS = '/order',
  BATCHES = '/order/batch-orders',
  CATEGORIES = '/product/category',
  INVENTORY = '/inventory/inventory-management',
  COUPON = '/coupon',
  USERS = '/user/edit',
  CUSTOMERS = '/customers/all-customers',
  NOTIF_CENTER = '/notifications',
  LOCATION = '/location/show-location',
  BANNERS = '/banners',
  BNPL_TRANSACTIONS = '/bnpl-transactions',
  MAILING_LISTS = '/mailing-list',
  HIERARCHY = '/hierarchy/company',
  SETTINGS = '/settings/app-versions',
}
