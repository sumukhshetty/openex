import React, { Component } from 'react'
import * as _ from 'lodash'

import SellTradeAdvertisementsListContainer from './SellTradeAdvertisementsListContainer'

import BrowserWalletLockedAlert from './../../generic-components/BrowserWalletLockedAlert'
import WrongNetwork from './../../layouts/wrongnetwork/WrongNetwork'
import YouAreFirst from './../../generic-components/YouAreFirst'

class SellTradeAdvertisements extends Component {

  render () {
    if(this.props.web3.locked || this.props.web3.wrongnetwork) {
      return(
        <div>
        { this.props.web3.locked ? <BrowserWalletLockedAlert /> : null }
        { this.props.web3.wrongnetwork ? <WrongNetwork /> : null }
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
