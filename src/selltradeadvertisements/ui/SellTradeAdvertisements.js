import React, { Component } from 'react'
import * as _ from 'lodash'

import SellTradeAdvertisementsListContainer from './SellTradeAdvertisementsListContainer'

import BrowserWalletLockedAlert from './../../generic-components/BrowserWalletLockedAlert'
import WrongNetwork from './../../layouts/wrongnetwork/WrongNetwork'
import YouAreFirst from './../../generic-components/YouAreFirst'
import VerifyWalletContainer from './../../verifywallet/ui/VerifyWalletContainer'

class SellTradeAdvertisements extends Component {

  render () {
    console.log("ui.SellTradeAdvertisements.render")
    console.log(this.props.web3)
    if(!this.props.web3.verified) {
      return(
        <div>
        
        { !this.props.web3.verified ? <VerifyWalletContainer/> : null }
        
        </div>
        )
    } else {
      return (
          <div>
            { this.props.selltradeadvertisements.data ? <SellTradeAdvertisementsListContainer /> : <YouAreFirst />}
          </div>
      )
    }
  }
}

export default SellTradeAdvertisements
