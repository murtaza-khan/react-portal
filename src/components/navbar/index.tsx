import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RetailoLogoHeader } from 'src/assets';
import { FaBars, FaPowerOff } from 'react-icons/fa';
import { logout } from 'src/store/thunks';
import { getAuthCookieName } from 'src/utils/auth';
import Cookies from 'js-cookie';

export const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const [userName, setuserName] = useState('');

  useEffect(() => {
    let data = { user: { name: '' } };
    const stringData = Cookies.get(getAuthCookieName(process.env.REACT_APP_ENV));

    if (stringData && stringData.length > 0) {
      data = JSON.parse(stringData);
    }

    const { user } = data;
    setuserName(user.name[0]);
  }, []);

  async function handleLogout() {
    dispatch(logout({}));
  }

  return (
    <div className="navbar shadow-md bg-white justify-between lg:shadow-none fixed z-10">
      <div className="flex-start">
        <RetailoLogoHeader width={120} className='lg:hidden' />
      </div>
      <div className="flex-end">
        <label htmlFor='my-drawer-2' className="btn btn-square btn-ghost lg:hidden">
          <FaBars className="text-primary text-2xl" />
        </label>
        <div className="dropdown dropdown-end hidden lg:block">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="flex aspect-square w-10 rounded-full bg-primary text-white	items-center justify-center">
              {userName}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black-light rounded-md w-52"
          >
            <li><a className="active:bg-primary" onClick={handleLogout}><FaPowerOff />Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
