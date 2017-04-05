import React from 'react';

const Clear = (props) => {
  return (

    <svg width='14px' height='8px' viewBox='2 5 14 8' version='1.1' xmlns='http://www.w3.org/2000/svg' className='dim' onClick={props.action}>
      <desc>Clear Icon</desc>
      <defs />
      <path d='M3.75,9.75 L14.25,9.75 L14.25,8.25 L3.75,8.25 L3.75,9.75 Z M2.25,12.75 L12.75,12.75 L12.75,11.25 L2.25,11.25 L2.25,12.75 Z M5.25,5.25 L5.25,6.75 L15.75,6.75 L15.75,5.25 L5.25,5.25 Z' id='Shape' stroke='none' fill='#000000' fill-rule='nonzero' />
    </svg>
  );
};

export default Clear;
