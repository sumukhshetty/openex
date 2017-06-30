import React from 'react';
import PropTypes from 'prop-types'
//import Flag from '../../images/svgReactComponents/Flag';
import Star from '../../images/Star';

const Trustworthiness = (props) => {
  return (
    <td className='fb15 flex cxc mxc'>
      <Star />
      {props.trustLevel}
    </td>
  );
};

Trustworthiness.propTypes = {
  trustLevel: PropTypes.string.isRequired
};
Trustworthiness.defaultProps = {
  trustLevel: 'Checking'
};

export default Trustworthiness;
