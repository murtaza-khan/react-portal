import React from 'react';
import { FaThList, FaShoppingCart, FaTruck, FaListAlt, FaHouzz, FaGift, FaUsers, FaUserAlt,
  FaBell, FaLocationArrow, FaImage, FaCreditCard, FaRegListAlt, FaCogs
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_NAMES, SIDEBAR_ROUTES, ADMIN_PORTAL_URL } from 'src/constants/navigation-routes';
import { RetailoLogoSidebar } from 'src/assets';

const PROFILE_SIDEBAR = [
  {
    name: SIDEBAR_NAMES.PRODUCTS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.PRODUCTS }`,
    icon: <FaThList />,
  },
  {
    name: SIDEBAR_NAMES.CATALOGUES,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.CATALOGUES }`,
    icon: <FaThList />,
  },
  {
    name: SIDEBAR_NAMES.ORDERS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.ORDERS }`,
    icon: <FaShoppingCart />,
  },
  {
    name: SIDEBAR_NAMES.BATCHES,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.BATCHES }`,
    icon: <FaTruck />,
  },
  {
    name: SIDEBAR_NAMES.CATEGORIES,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.CATEGORIES }`,
    icon: <FaListAlt />,
  },
  {
    name: SIDEBAR_NAMES.INVENTORY,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.INVENTORY }`,
    icon: <FaHouzz />,
  },
  {
    name: SIDEBAR_NAMES.COUPON,
    to: `${ SIDEBAR_ROUTES.COUPON }`,
    icon: <FaGift />,
  },
  {
    name: SIDEBAR_NAMES.USERS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.USERS }`,
    icon: <FaUsers />,
  },
  {
    name: SIDEBAR_NAMES.CUSTOMERS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.CUSTOMERS }`,
    icon: <FaUserAlt />,
  },
  {
    name: SIDEBAR_NAMES.NOTIF_CENTER,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.NOTIF_CENTER }`,
    icon: <FaBell />,
  },
  {
    name: SIDEBAR_NAMES.LOCATION,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.LOCATION }`,
    icon: <FaLocationArrow />,
  },
  {
    name: SIDEBAR_NAMES.BANNERS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.BANNERS }`,
    icon: <FaImage />,
  },
  {
    name: SIDEBAR_NAMES.BNPL_TRANSACTIONS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.BNPL_TRANSACTIONS }`,
    icon: <FaCreditCard />,
  },
  {
    name: SIDEBAR_NAMES.MAILING_LISTS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.MAILING_LISTS }`,
    icon: <FaRegListAlt />,
  },
  {
    name: SIDEBAR_NAMES.HIERARCHY,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.HIERARCHY }`,
    icon: <FaCogs />,
  },
  {
    name: SIDEBAR_NAMES.SETTINGS,
    to: `${ADMIN_PORTAL_URL}${ SIDEBAR_ROUTES.SETTINGS }`,
    icon: <FaCogs />,
  },
];


export const SideBar: React.FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu overflow-y-auto w-[265px] bg-gray-gray1 text-base-content">
        {/* <!-- Sidebar content here --> */}
        <div className="my-5 mx-auto">
          <RetailoLogoSidebar width={ 130 } />
        </div>
        { PROFILE_SIDEBAR.map((item, index) => (
          <li key={index} className="h-[41px] border-b border-solid	border-gray-gray2 justify-center">
            { item.name === SIDEBAR_NAMES.COUPON ?
              <NavLink
                key={index}
                to={item.to}
                className="px-10 py-0 h-full text-sm text-black-light
                hover:text-primary active:text-primary active:bg-gray-gray3"
                activeClassName="text-primary bg-gray-gray3"
              >
                {item.icon}
                {item.name}
              </NavLink> :
              <a href={item.to} className="px-10 py-0 h-full text-sm text-black-light
              hover:text-primary active:text-primary active:bg-gray-gray3">
                {item.icon}
                {item.name}
              </a>
            }
          </li>
          )
        )}
      </ul>
    </div>
  );
};
