import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import BuyButton from './BuyButton';
import LastOnline from './LastOnline';
import Trustworthiness from './Trustworthiness';

const SingleBuyOrder = (props) => {
  return (
    <tr className='flex list bg-white pa3 ma2 gray'>
      <td className='fb20' >David Washington - {props.buyOrderData.location}</td>
      <td className='fb10 tc' >IMPS</td>
      <td className='fb15 tc' >{props.buyOrderData.amount} INR</td>
      <td className='fb5 tc' >{props.buyOrderData.maxTransactionLimit}</td>
      <td className='fb15 tc' >10 Oct 2017</td>
      <Trustworthiness trustLevel={'Perfect'} />
      <LastOnline time={props.buyOrderData.lastUpated} />
      <BuyButton />
    </tr>
  );
};

SingleBuyOrder.propTypes = {
  buyOrderData: PropTypes.object.isRequired
};

export default SingleBuyOrder;
