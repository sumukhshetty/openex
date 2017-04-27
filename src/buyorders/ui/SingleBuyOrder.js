import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import SellButton from './SellButton';

import LastOnline from './LastOnline';
import Trustworthiness from './Trustworthiness';
const moment = require('moment');

const SingleBuyOrder = (props) => {
  return (
    <tbody className='flex'>
      {props.buyOrderData && props.userData &&
      <tr>
        <td className='fb20' >{props.buyOrderData.buyerUsername} - {props.buyOrderData.location}</td>
        <td className='fb10 tc' >{props.buyOrderData.paymentMethod}</td>
        <td className='fb15 tc' >{props.buyOrderData.amount}</td>
        <td className='fb5 tc' >{props.buyOrderData.minTransactionLimit} - {props.buyOrderData.maxTransactionLimit}</td>
        <td className='fb15 tc' >{moment(props.userData.lastTransfer).fromNow() || '-'}</td>
        <Trustworthiness trustLevel={props.userData.trustworthiness} />
        <LastOnline time={props.userData.lastOnline} />
        <SellButton orderId={props.buyOrderData.orderId} />
      </tr>}
    </tbody>
  );
};

SingleBuyOrder.propTypes = {
  buyOrderData: PropTypes.object.isRequired
};

export default SingleBuyOrder;
