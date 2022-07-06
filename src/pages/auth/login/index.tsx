import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'src/store/thunks';
import { checkLoginApiData } from 'src/utils/auth'
import { toast } from 'react-toastify';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const role_id = [1, 9];
  const dispatch = useDispatch();

  async function handleLogin() {

    const validate = checkLoginApiData({ username, password });

    if (validate.ok) {
      dispatch(login({ username, password, role_id }));
    } else {
      toast.error(validate.error);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  const boxDimensions = {
    height: 400,
    width: 600,
  };

  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <div className='shadow-xl rounded-md' style={boxDimensions}>

          <div className='h-1/4 grid place-content-center'>
            <img className='w-48' src={require('../../../assets/images/retailo-logo.png')} />
          </div>

          <div className='h-1/6 mt-12 flex flex-row'>
            <div className='w-1/5 grid content-center justify-end'>
              <i className="fa fa-user fa-2x p-4" aria-hidden="true"></i>
            </div>
            <div className='w-4/5 grid content-center'>
              <input
                onChange={e => setUserName(e.target.value)}
                placeholder='Email'
                className='p-4 yt-input focus:shadow-none border placeholder-opacity-25 border-primary
                focus:outline-none rounded-md w-96'
                name='username'
                type='username'
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          </div>

          <div className='h-1/6 flex flex-row'>
            <div className='w-1/5 grid content-center justify-end'>
              <i className="fa fa-lock fa-2x p-4" aria-hidden="true"></i>
            </div>
            <div className='w-4/5 grid content-center'>
              <input
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                className='p-4 yt-input focus:shadow-none border placeholder-opacity-25 border-primary
                focus:outline-none rounded-md w-96'
                name='password'
                type='password'
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          </div>

          <div className='h-1/4 mt-4 grid place-content-center'>
            <button
              onClick={handleLogin}
              className='bg-white border-neutral text-primary p-4 uppercase border focus:outline-none focus:ring-2
              focus:ring-violet-200 rounded w-36 hover:bg-primary hover:text-white'
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
