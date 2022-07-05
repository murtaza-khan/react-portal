import React from 'react';
import { STATUS_MESSAGES } from 'src/constants/response-types';

export const ErrorScreen: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>{ STATUS_MESSAGES.WENT_WRONG }</p>
      </header>
    </div>
  );
};
