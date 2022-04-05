import React from 'react';
import { RetailoLogoHeader } from 'src/assets';
import { FaBars, FaPowerOff } from 'react-icons/fa';

export const NavBar: React.FC = () => {
  return (
    <div className="navbar shadow-md bg-white justify-between lg:shadow-none">
      <div className="flex-start">
        <RetailoLogoHeader width={ 120 } className='lg:hidden'/>
      </div>
      <div className="flex-end">
        <label htmlFor='my-drawer-2' className="btn btn-square btn-ghost lg:hidden">
          <FaBars className="text-orange-orange3 text-2xl" />
        </label>
        <div className="dropdown dropdown-end hidden lg:block">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="flex aspect-square w-10 rounded-full bg-orange-orange3 text-white	items-center justify-center">
              h
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black-black1 rounded-md w-52">
            <li><a className="active:bg-orange-orange8"><FaPowerOff />Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
