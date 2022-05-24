import React from 'react';
import { FaThList, FaShoppingCart, FaTruck, FaListAlt, FaHouzz, FaGift, FaUsers, FaUserAlt,
  FaBell, FaLocationArrow, FaImage, FaCreditCard, FaRegListAlt, FaCogs, FaSuperpowers
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_NAMES, ADMIN_PORTAL_URL, LOYALTY_PORTAL_URL } from 'src/constants/navigation-routes';
import { RetailoLogoSidebar } from 'src/assets';

const PROFILE_SIDEBAR = [
  {
    name: SIDEBAR_NAMES.PRODUCTS,
    to: `${ADMIN_PORTAL_URL}/product`,
    icon: <FaThList />,
  },
  {
    name: SIDEBAR_NAMES.CATALOGUES,
    to: `${ADMIN_PORTAL_URL}/catalogue`,
    icon: <FaThList />,
  },
  {
    name: SIDEBAR_NAMES.ORDERS,
    to: `${ADMIN_PORTAL_URL}/order`,
    icon: <FaShoppingCart />,
  },
  {
    name: SIDEBAR_NAMES.BATCHES,
    to: `${ADMIN_PORTAL_URL}/order/batch-orders`,
    icon: <FaTruck />,
  },
  {
    name: SIDEBAR_NAMES.CATEGORIES,
    to: `${ADMIN_PORTAL_URL}/product/category`,
    icon: <FaListAlt />,
  },
  {
    name: SIDEBAR_NAMES.INVENTORY,
    to: `${ADMIN_PORTAL_URL}/inventory/inventory-management`,
    icon: <FaHouzz />,
  },
  {
    name: SIDEBAR_NAMES.COUPON,
    to: `/coupon`,
    icon: <FaGift />,
  },
  {
    name: SIDEBAR_NAMES.USERS,
    to: `${ADMIN_PORTAL_URL}/user/edit`,
    icon: <FaUsers />,
  },
  {
    name: SIDEBAR_NAMES.CUSTOMERS,
    to: `${ADMIN_PORTAL_URL}/customers/all-customers`,
    icon: <FaUserAlt />,
  },
  {
    name: SIDEBAR_NAMES.NOTIF_CENTER,
    to: `${ADMIN_PORTAL_URL}/notifications`,
    icon: <FaBell />,
  },
  {
    name: SIDEBAR_NAMES.LOCATION,
    to: `${ADMIN_PORTAL_URL}/location/show-location`,
    icon: <FaLocationArrow />,
  },
  {
    name: SIDEBAR_NAMES.BANNERS,
    to: `${ADMIN_PORTAL_URL}/banners`,
    icon: <FaImage />,
  },
  {
    name: SIDEBAR_NAMES.BNPL_TRANSACTIONS,
    to: `${ADMIN_PORTAL_URL}/bnpl-transactions`,
    icon: <FaCreditCard />,
  },
  {
    name: SIDEBAR_NAMES.MAILING_LISTS,
    to: `${ADMIN_PORTAL_URL}/mailing-list`,
    icon: <FaRegListAlt />,
  },
  {
    name: SIDEBAR_NAMES.REWARDS,
    to: `${LOYALTY_PORTAL_URL}/app/loyalty`,
    icon: <FaSuperpowers />,
  },
  {
    name: SIDEBAR_NAMES.HIERARCHY,
    to: `${ADMIN_PORTAL_URL}/hierarchy/company`,
    icon: <FaCogs />,
  },
  {
    name: SIDEBAR_NAMES.SETTINGS,
    to: `${ADMIN_PORTAL_URL}/settings/app-versions`,
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
