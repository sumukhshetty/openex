import React from 'react';

const Cancel = (props) => {
  return (
    <svg width='12px' height='12px' viewBox='3 3 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' className='dim' onClick={props.action}>
      <desc>Cancel Icon</desc>
      <defs />
      <polygon id='Shape' stroke='none' fill='#000000' fillRule='nonzero' points='14.25 4.8075 13.1925 3.75 9 7.9425 4.8075 3.75 3.75 4.8075 7.9425 9 3.75 13.1925 4.8075 14.25 9 10.0575 13.1925 14.25 14.25 13.1925 10.0575 9' />
    </svg>
  );
};

export default Cancel;
