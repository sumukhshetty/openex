import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import BuyButton from './BuyButton';
import LastOnline from './LastOnline';
import Trustworthiness from './Trustworthiness';

const SingleBuyOrder = (props) => {
  return (
    <div className='flex list bg-white pa3 ma2 gray'>
      <li className='fb20' >David Washington - {props.buyOrderData.location}</li>
      <li className='fb10 tc' >IMPS</li>
      <li className='fb15 tc' >{props.buyOrderData.amount} INR</li>
      <li className='fb5 tc' >{props.buyOrderData.maxTransactionLimit}</li>
      <li className='fb15 tc' >10 Oct 2017</li>
      <Trustworthiness trustLevel={'Perfect'} />
      <LastOnline time={props.buyOrderData.lastUpated} />
      <BuyButton />
    </div>
  );
};

SingleBuyOrder.propTypes = {
  buyOrderData: PropTypes.object.isRequired
};

export default SingleBuyOrder;
