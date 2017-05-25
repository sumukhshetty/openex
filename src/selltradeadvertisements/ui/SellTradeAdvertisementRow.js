import React from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import BuyButton from '../layouts/BuyButton'

import LastOnline from './LastOnline'
import Trustworthiness from './Trustworthiness'
const moment = require('moment')

const SellTradeAdvertisementRow = (props) => {
  return (
    <tbody className='flex'>
      {props.sellTradeAdvertisementData && props.seller &&
      <tr className='flex cxc'>
        <td className='fb20' >{props.sellTradeAdvertisementData.buyerUsername} - {props.sellTradeAdvertisementData.location}</td>
        <td className='fb10 tc' >{props.sellTradeAdvertisementData.paymentMethod}</td>
        <td className='fb15 tc' >{props.sellTradeAdvertisementData.amount}</td>
        <td className='fb5 tc' >{props.sellTradeAdvertisementData.minTransactionLimit} - {props.sellTradeAdvertisementData.maxTransactionLimit}</td>
        <td className='fb15 tc' >{moment(props.seller.lastTransfer).fromNow() || '-'}</td>
        <Trustworthiness trustLevel={props.seller.trustworthiness} />
        <LastOnline time={props.seller.lastOnline} />
        <BuyButton sellTradeAdvertisementId={props.key} />
      </tr>}
    </tbody>
  )
}

SellTradeAdvertisementRow.propTypes = {
  sellTradeAdvertisementData: PropTypes.object.isRequired
}

export default SellTradeAdvertisementRow
