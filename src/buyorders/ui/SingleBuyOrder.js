import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import SellButton from './SellButton';

import LastOnline from './LastOnline';
import Trustworthiness from './Trustworthiness';

const SingleBuyOrder = (props) => {
  return (
    <tbody className='flex'>
      <tr>
        <td className='fb20' >{props.buyOrderData.buyerUsername} - {props.buyOrderData.location}</td>
        <td className='fb10 tc' >{props.buyOrderData.paymentMethod}</td>
        <td className='fb15 tc' >{props.buyOrderData.amount} {props.buyOrderData.currency}</td>
        <td className='fb5 tc' >{props.buyOrderData.maxTransactionLimit}</td>
        <td className='fb15 tc' >10 Oct 2017</td>
        <Trustworthiness trustLevel={'Perfect'} />
        <LastOnline time={props.buyOrderData.lastUpated} />
        <SellButton orderId={props.buyOrderData.orderId} />
      </tr>
    </tbody>
  );
};

SingleBuyOrder.propTypes = {
  buyOrderData: PropTypes.object.isRequired
};

export default SingleBuyOrder;
