import React from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import BuyButton from '../layouts/BuyButton'

import LastOnline from './LastOnline'
import Trustworthiness from './Trustworthiness'
const moment = require('moment')

const SellTradeAdvertisementRow = (props) => {
  if (props.sellTradeAdvertisementData && props.seller) {
    return (
      <tr className='flex cxc'>
        <td className='fb20' >{props.sellTradeAdvertisementData.sellerUsername} - {props.sellTradeAdvertisementData.location}</td>
        <td className='fb10 tc' >{props.sellTradeAdvertisementData.paymentMethod}</td>
        <td className='fb15 tc' >{props.price.toFixed(2)}</td>
        <td className='fb5 tc' >{props.sellTradeAdvertisementData.minTransactionLimit} - {props.sellTradeAdvertisementData.maxTransactionLimit}</td>
        <td className='fb15 tc' >{moment(props.seller.lastTransfer).fromNow() || '-'}</td>
        <Trustworthiness trustLevel={props.seller.avgFeedback} />
        <LastOnline time={props.seller.lastOnline} />
        <BuyButton sellTradeAdvertisementId={props.sellTradeAdvertisementId} />
      </tr>
    ) 
  } else {
    return null
  }
}

SellTradeAdvertisementRow.propTypes = {
  sellTradeAdvertisementData: PropTypes.object.isRequired
}

export default SellTradeAdvertisementRow
