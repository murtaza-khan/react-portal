import { ROLES } from '../constants/roles';
import { Dashboard, Profile } from '../pages';

// TODO:
/*
* 1. Make title optional
* 2. Make title multi type support ie: (string, node, react element)
* 3. Add child route support
* */


export default [
  {
    component: Dashboard,
    path: '/dashboard',
    title: 'Dashboard',
    permission: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },
  {
    component: Profile,
    path: '/profile',
    title: 'Profile',
    permission: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.MANAGER,
      ROLES.CUSTOMER,
    ],
  },
];
