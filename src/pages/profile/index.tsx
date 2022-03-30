import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/thunks/auth';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logout({}));
  }

  return (<div className='text-center'>
    <header className='bg-white min-h-screen flex flex-col justify-center items-center text-black'>
      <p data-cy='profile-text'>{ 'This is user Profile' }</p>
      <button
        onClick={ handleLogout }
        className={ `bg-orange-orange1 text-white p-4 uppercase border w-full
       text-white focus:outline-none focus:ring-2 focus:ring-violet-200 rounded` }
      >
        { 'sign out' }
      </button>
    </header>
  </div>);
};
