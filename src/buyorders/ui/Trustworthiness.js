import React, {
  PropTypes
} from 'react';
import Flag from './Flag';

const Trustworthiness = (props) => {
  return (
    <li className='fb15 flex cxc mxc'>
      <Flag color={props.trustLevel} />
      {props.trustLevel}
    </li>
  );
};

Trustworthiness.propTypes = {
  trustLevel: PropTypes.string.isRequired
};
Trustworthiness.defaultProps = {
  trustLevel: 'Checking'
};

export default Trustworthiness;
