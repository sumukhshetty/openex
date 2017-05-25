import React from 'react';
import PropTypes from 'prop-types'
import Flag from '../../images/svgReactComponents/Flag';

const Trustworthiness = (props) => {
  return (
    <td className='fb15 flex cxc mxc'>
      <Flag color={props.trustLevel} />
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
