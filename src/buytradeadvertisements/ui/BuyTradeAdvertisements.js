import React, { Component } from 'react'
import * as _ from 'lodash'

import BuyTradeAdvertisementsListContainer from './BuyTradeAdvertisementsListContainer'

import YouAreFirst from './../../generic-components/YouAreFirst'

class BuyTradeAdvertisements extends Component {
  componentDidMount(){
    window.analytics.track('User Clicked Sell Tab', {
      location: 'buytradeadvertisements'
    })
  }
  render () {
    return (
      <div>
        { this.props.buytradeadvertisements.data ? <BuyTradeAdvertisementsListContainer /> : <YouAreFirst />}
      </div>
  )}
}

export default BuyTradeAdvertisements
