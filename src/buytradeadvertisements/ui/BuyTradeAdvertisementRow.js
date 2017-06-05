import React from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import SellButton from '../layouts/SellButton'

import LastOnline from './LastOnline'
import Trustworthiness from './Trustworthiness'
const moment = require('moment')

const BuyTradeAdvertismentRow = (props) => {
  if (props.buyTradeAdvertisementData && props.buyer){
    return (
      <tr className='flex cxc'>
        <td className='fb20' >{props.buyTradeAdvertisementData.buyerUsername} - {props.buyTradeAdvertisementData.location}</td>
        <td className='fb10 tc' >{props.buyTradeAdvertisementData.paymentMethod}</td>
        <td className='fb15 tc' >{props.price}</td>
        <td className='fb5 tc' >{props.buyTradeAdvertisementData.minTransactionLimit} - {props.buyTradeAdvertisementData.maxTransactionLimit}</td>
        <td className='fb15 tc' >{moment(props.buyer.lastTransfer).fromNow() || '-'}</td>
        <Trustworthiness trustLevel={props.buyer.trustworthiness} />
        <LastOnline time={props.buyer.lastOnline} />
        <SellButton buyTradeAdvertisementId={props.buyTradeAdvertisementId} />
      </tr>
      )
  }
}

BuyTradeAdvertismentRow.propTypes = {
  buyTradeAdvertisementData: PropTypes.object.isRequired
}

export default BuyTradeAdvertismentRow
