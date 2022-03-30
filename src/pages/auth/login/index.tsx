import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/thunks/auth';

function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  async function handleLogin() {
    dispatch(login({ email: mail, password}));
  }

  return (
    <div className='h-screen w-screen bg-gray-100 grid  grid-cols-1'>
      <div className='bg-white flex flex-col login-bg'>
        <div className='bg-white rounded-lg p-8 login-container'>
          <h1 className='text-black text-4xl mb-1'>Log in</h1>
          <h3 className='text-base font-light mt-3 mb-12'>
            Welcome Back to your Retailo
          </h3>
          <input
            onChange={ e => setMail(e.target.value) }
            placeholder='Email Address'
            className=' p-4 yt-input w-full border placeholder-opacity-25 border-orange-orange7
            focus:outline-none focus:ring-2 focus:ring-orange-orange2 rounded mb-2'
            name='mail'
            type='mail'
          />
          <div className='input-root mb-8'>
            <input
              onChange={ e => setPassword(e.target.value) }
              placeholder='Password'
              className='  p-4 yt-input w-full border placeholder-opacity-25 border-orange-orange7
              focus:outline-none focus:ring-2 focus:ring-orange-orange2 rounded mb-2'
              name='password'
              type={ 'password' }
            />
          </div>

          <button
            onClick={ handleLogin }
            className={ `bg-orange-orange1 text-white p-4 uppercase border w-full
         text-white focus:outline-none focus:ring-2 focus:ring-violet-200 rounded` }
          >
            { 'sign in' }
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
