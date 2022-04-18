import React from 'react';
import { useDispatch } from 'react-redux';
import { RetailoLogoHeader } from 'src/assets';
import { FaBars, FaPowerOff } from 'react-icons/fa';
import { logout } from '../../store/thunks/auth';

export const NavBar: React.FC = () => {
  const dispatch = useDispatch();

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
              h
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black-light rounded-md w-52">
            <li><a className="active:bg-primary" onClick={handleLogout}><FaPowerOff />Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
