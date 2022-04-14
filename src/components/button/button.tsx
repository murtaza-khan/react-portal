import React from 'react';


export const Button: React.FC<IActionButton> = ({dataCy, onClick, text}) => (
  <button
    data-cy={ dataCy }
    className='bg-primary text-white rounded text-lg	w-40 m-2
    hover:bg-orange-dark hover:border-1'
    onClick={ onClick }
  > { text }</button>
);
