import React, {
  PropTypes
} from 'react';

// append options{
//   percent
// }

export const Input = ({props}) => (
  <input
    id='location'
    name='location'
    type='text'
    value={props.value}
    onChange={props.onChange}
    placeholder='Enter a Location'
    className='w5 h-100' />
  );

Input.propTypes = {
  // append: PropTypes.string.isRequired
};
Input.defaultProps = {};
