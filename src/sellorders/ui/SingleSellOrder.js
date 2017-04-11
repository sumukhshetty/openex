import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import BuyButton from './BuyButton'

import LastOnline from './LastOnline';
import Trustworthiness from './Trustworthiness';

const SingleSellOrder = (props) => {
  return (
    <tr className='flex list bg-white pa3 ma2 gray'>
      <td className='fb20' >David Washington - Hong Kong</td>
      <td className='fb10 tc' >IMPS</td>
      <td className='fb15 tc' >12345 INR</td>
      <td className='fb5 tc' >12345 - 123456</td>
      <td className='fb15 tc' >10 Oct 2017</td>
      <Trustworthiness trustLevel={'Perfect'} />
      <LastOnline time={37} />
      <BuyButton orderId={props.sellOrderData.orderId}/>
    </tr>
  );
};

SingleSellOrder.propTypes = {
  sellOrderData: PropTypes.object.isRequired
};

export default SingleSellOrder;
