import React from 'react';
import PropTypes from 'prop-types'

const LastOnline = (props) => {
  const time = Math.floor((new Date() - Date.parse(props.time)) / (1000 * 60 * 60));
  return (
    isNaN(time)
    ? <td className='fb15 flex cxc mxc'><span className='blackDot mr1' /><span >Disabled</span></td>
    : <td className='fb15 flex cxc mxc'><span className='greenDot mr1' /><span>{time === 0 ? 'Active' : `${time} hours ago`}</span></td>
  );
};

LastOnline.propTypes = {
  time: PropTypes.string.isRequired
};
LastOnline.defaultProps = {};

export default LastOnline;
