import React from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import BuyButton from '../layouts/BuyButton'
import LastOnline from '../../generic-components/tables/LastOnline.js'
import Trustworthiness from './Trustworthiness'
const moment = require('moment')

const BrowseSellAdvertisementRow = props => {
  var lastTransfer
  if (props.sellTradeAdvertisementData && props.seller) {
    if (props.seller.lastTransfer) {
      lastTransfer = moment(props.seller.lastTransfer).fromNow()
    } else {
      lastTransfer = '-'
    }

    return (
      <tr className="flex cxc">
        <td className="fb20">
          {props.sellTradeAdvertisementData.sellerUsername} -{' '}
          {props.sellTradeAdvertisementData.location}
        </td>
        <td className="fb10 tc">
          {props.sellTradeAdvertisementData.paymentMethod}
        </td>
        <td className="fb15 tc">
          {props.price}
        </td>
        <td className="fb5 tc">
          {props.sellTradeAdvertisementData.minTransactionLimit} -{' '}
          {props.sellTradeAdvertisementData.maxTransactionLimit}
        </td>
        <td className="fb15 tc">
          {lastTransfer}
        </td>
        <Trustworthiness trustLevel={props.seller.avgFeedback} />
        <LastOnline time={props.presence} />
        <BuyButton sellTradeAdvertisementId={props.sellTradeAdvertisementId} />
      </tr>
    )
  } else {
    return null
  }
}

BrowseSellAdvertisementRow.propTypes = {
  sellTradeAdvertisementData: PropTypes.object.isRequired
}

export default BrowseSellAdvertisementRow
