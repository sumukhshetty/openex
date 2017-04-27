import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import BuyButton from './BuyButton'

import LastOnline from './LastOnline';
import Trustworthiness from './Trustworthiness';

const moment = require('moment')

const SingleSellOrder = (props) => {
  return (
    <tr className='flex list bg-white pa3 ma2 gray'>
      <td className='fb20' >{props.sellOrderData.sellerUsername} - {props.sellOrderData.location}</td>
      <td className='fb10 tc' >{props.sellOrderData.paymentMethod}</td>
      {/*TODO: get the price equation working*/}
      <td className='fb15 tc' >{props.sellOrderData.amount} INR</td>
      <td className='fb5 tc' >{props.sellOrderData.minTransactionLimit} - {props.sellOrderData.maxTransactionLimit}</td>
      {props.userData && <td className='fb15 tc' >{moment(props.userData.lastTransfer).fromNow() || '-'}</td>}
      {props.userData && <Trustworthiness trustLevel={props.userData.trustworthiness} />}
      {props.userData && <LastOnline time={props.userData.lastOnline} />}
      <BuyButton orderId={props.sellOrderData.orderId}/>
    </tr>
  );
};

SingleSellOrder.propTypes = {
  sellOrderData: PropTypes.object.isRequired
};

export default SingleSellOrder;
