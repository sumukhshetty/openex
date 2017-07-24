import React from 'react';

const moment = require('moment');

const LastOnline = (props) => {
  // const time = Math.floor((new Date() - new Date(props.time)) / (1000 * 60 * 60));
  var time
  if (time === 'Active'){
    time === 'a few seconds ago'
  } else {
    time = moment(props.time).fromNow();
  }
  return (
    // isNaN(time)
    // ? <td className='fb15 flex cxc mxc'><span className='blackDot mr1' /><span >Disabled</span></td>
    // : <td className='fb15 flex cxc mxc'><span className='greenDot mr1' /><span>{time === 0 ? 'Active' : `${time} ago`}</span></td>
    <td className='fb15 flex cxc mxc'><span className='greenDot mr1' /><span>{time === 'a few seconds ago' ? 'Active' : time}</span></td>
  );
};

// LastOnline.propTypes = {
//   time: PropTypes.string.isRequired
// };
LastOnline.defaultProps = {};

export default LastOnline;
