import React, { Component } from 'react'
import * as _ from 'lodash'

import BuyTradeAdvertisementsListContainer from './BuyTradeAdvertisementsListContainer'

import BrowserWalletLockedAlert from './../../generic-components/BrowserWalletLockedAlert'
import WrongNetwork from './../../layouts/wrongnetwork/WrongNetwork'
import YouAreFirst from './../../generic-components/YouAreFirst'
import VerifyWalletContainer from './../../verifywallet/ui/VerifyWalletContainer'

class BuyTradeAdvertisements extends Component {
  render () {
    return (
      <div>
        { this.props.buytradeadvertisements.data ? <BuyTradeAdvertisementsListContainer /> : <YouAreFirst />}
      </div>
  )}
}

export default BuyTradeAdvertisements
