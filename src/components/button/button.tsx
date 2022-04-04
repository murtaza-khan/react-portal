import React from 'react';


export const Button: React.FC<IActionButton> = ({dataCy, onClick, text}) => (
  <button
    data-cy={ dataCy }
    className='bg-orange-orange2 text-white rounded text-lg	w-40 m-2
    hover:bg-orange-orange7 hover:text-orange-orange2 hover:border-1'
    onClick={ onClick }
  > { text }</button>
);
