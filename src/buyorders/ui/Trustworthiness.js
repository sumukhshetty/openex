import React, {
  PropTypes
} from 'react';
import Flag from '../../generic-components/Flag';

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
