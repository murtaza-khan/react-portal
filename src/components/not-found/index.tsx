import React, { memo } from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => (<div className='text-center'>
  <header className='bg-white min-h-screen flex flex-col justify-center items-center text-black'>
    <img
      src={ require('../../assets/images/retailo.png') }
      className = 'h-60 pointer-events-none motion-safe:animate-pulse'
      alt='logo'
    />
    <p data-cy='welcome-text'>Not Found</p>
    <div className='flex-row'>
      <Link to='/'>Back to home</Link>
    </div>
  </header>
</div>);

export default memo(NotFound);
