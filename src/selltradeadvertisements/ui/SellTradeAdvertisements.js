import React, { Component } from 'react'
import * as _ from 'lodash'

import SellTradeAdvertisementsListContainer from './SellTradeAdvertisementsListContainer'

import YouAreFirst from './../../generic-components/YouAreFirst'

class SellTradeAdvertisements extends Component {

  render () {
    return (
        <div>
          { this.props.selltradeadvertisements.data ? <SellTradeAdvertisementsListContainer /> : <YouAreFirst />}
        </div>
    )
  }
}

export default SellTradeAdvertisements
