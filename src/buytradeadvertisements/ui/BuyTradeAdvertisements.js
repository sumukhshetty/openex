import React, { Component } from 'react'
import * as _ from 'lodash'

import BuyTradeAdvertisementsListContainer from './BuyTradeAdvertisementsListContainer'

import BrowserWalletLockedAlert from './../../generic-components/BrowserWalletLockedAlert'
import WrongNetwork from './../../layouts/wrongnetwork/WrongNetwork'
import YouAreFirst from './../../generic-components/YouAreFirst'
import VerifyWalletContainer from './../../verifywallet/ui/VerifyWalletContainer'

class BuyTradeAdvertisements extends Component {
  render () {
    if(!this.props.web3.verified) {
      return(
        <div>
        
        { !this.props.web3.verified ? <VerifyWalletContainer/> : null }
        
        </div>
        )
    } else {
      return (
        <div>
          { this.props.buytradeadvertisements.data ? <BuyTradeAdvertisementsListContainer /> : <YouAreFirst />}
        </div>
      )
    }
  }
}

export default BuyTradeAdvertisements
