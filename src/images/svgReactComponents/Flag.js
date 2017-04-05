import React, {PropTypes} from 'react';

const Flag = (props) => {
  let colour = '';

  switch (props.color) {
    case 'Sufficient':
      colour = '#2196F3';
      break;
    case 'Perfect':
      colour = '#4CAF50';
      break;
    case 'Unsufficient':
      colour = '#9C27B0';
      break;
    case 'New':
      colour = '#F44336';
      break;
    case 'Checking':
      colour = '#666';
      break;
    default:
      colour = '#999';
  }

  return (
    <svg width='18px' height='18px' viewBox='0 0 18 18' version='1.1' xmlns='http://www.w3.org/2000/svg' >
      <desc>Created with Sketch.</desc>
      <defs />
      <g id='Group' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <polygon id='Shape' points='0 0 18 0 18 18 0 18' />
        <polygon id='Shape' fill={colour} fillRule='nonzero' points='10.8 4.5 10.5 3 3.75 3 3.75 15.75 5.25 15.75 5.25 10.5 9.45 10.5 9.75 12 15 12 15 4.5' />
      </g>
    </svg>
  );
};

Flag.propTypes = {
  colour: PropTypes.string.isRequired
};
Flag.defaultProps = {
  colour: 'Checking'
};

export default Flag;
