import { ADD_ROUTE } from './../constants/navigation-routes';
import { ROLE_TYPE } from '../constants/roles';
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
      ROLE_TYPE.ADMIN,
      ROLE_TYPE.COMPANY_OWNER,
    ],
  },
  {
    component: AddCoupon,
    path: ADD_ROUTE,
    title: 'Add Coupon',
    permission: [
      ROLE_TYPE.ADMIN,
      ROLE_TYPE.COMPANY_OWNER,
    ],
  },
];
