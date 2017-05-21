import React, { PropTypes } from 'react'
import * as _ from 'lodash'
import SellButton from '../layouts/SellButton'

import LastOnline from './LastOnline'
import Trustworthiness from './Trustworthiness'
const moment = require('moment')

const SingleBuyTradeAdvertisment = (props) => {
  return (
    <tbody className='flex'>
      {props.buyTradeAdvertisementData && props.userData &&
      <tr className='flex cxc'>
        <td className='fb20' >{props.buyTradeAdvertisementData.buyerUsername} - {props.buyTradeAdvertisementData.location}</td>
        <td className='fb10 tc' >{props.buyTradeAdvertisementData.paymentMethod}</td>
        <td className='fb15 tc' >{props.buyTradeAdvertisementData.amount}</td>
        <td className='fb5 tc' >{props.buyTradeAdvertisementData.minTransactionLimit} - {props.buyTradeAdvertisementData.maxTransactionLimit}</td>
        <td className='fb15 tc' >{moment(props.userData.lastTransfer).fromNow() || '-'}</td>
        <Trustworthiness trustLevel={props.userData.trustworthiness} />
        <LastOnline time={props.userData.lastOnline} />
        <SellButton buyTradeAdvertisementId={props.buyTradeAdvertisementData.advertisementId} />
      </tr>}
    </tbody>
  )
}

SingleBuyTradeAdvertis.propTypes = {
  buyTradeAdvertisementData: PropTypes.object.isRequired
}

export default SingleBuyTradeAdvertisment
