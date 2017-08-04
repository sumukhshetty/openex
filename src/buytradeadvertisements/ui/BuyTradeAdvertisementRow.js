import React from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import SellButton from '../layouts/SellButton'

import LastOnline from '../../generic-components/tables/LastOnline.js'
import Trustworthiness from './Trustworthiness'
const moment = require('moment')

const BuyTradeAdvertismentRow = props => {
  var lastTransfer
  if (props.buyTradeAdvertisementData && props.buyer) {
    if (props.buyer.lastTransfer) {
      lastTransfer = moment(props.buyer.lastTransfer).fromNow()
    } else {
      lastTransfer = '-'
    }
    return (
      <tr className="flex cxc">
        <td className="fb20">
          {props.buyTradeAdvertisementData.buyerUsername}
        </td>
        <td className="fb10 tc">
          {props.buyTradeAdvertisementData.paymentMethod}
        </td>
        <td className="fb15 tc">
          {props.price}
        </td>
        <td className="fb5 tc">
          {props.buyTradeAdvertisementData.minTransactionLimit} -{' '}
          {props.buyTradeAdvertisementData.maxTransactionLimit}
        </td>
        <td className="fb15 tc">
          {lastTransfer}
        </td>
        <Trustworthiness trustLevel={props.buyer.avgFeedback} />
        <LastOnline time={props.presence} />
        <SellButton buyTradeAdvertisementId={props.buyTradeAdvertisementId} />
      </tr>
    )
  } else {
    return null
  }
}

BuyTradeAdvertismentRow.propTypes = {
  buyTradeAdvertisementData: PropTypes.object.isRequired
}

export default BuyTradeAdvertismentRow
