import { ROLES } from '../constants/roles';
import { Coupon, AddCoupon } from '../pages';

// TODO:
/*
* 1. Make title optional
* 2. Make title multi type support ie: (string, node, react element)
* 3. Add child route support
* */


export default [
  {
    component: Coupon,
    path: '/',
    title: 'Coupon',
    permission: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.MANAGER,
      ROLES.CUSTOMER,
    ],
  },
  {
    component: AddCoupon,
    path: '/add',
    title: 'Add Coupon',
    permission: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.MANAGER,
      ROLES.CUSTOMER,
    ],
  },
];
