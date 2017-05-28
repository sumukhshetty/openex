import React, { Component } from 'react'
import * as _ from 'lodash'

import BuyTradeAdvertisementsListContainer from './BuyTradeAdvertisementsListContainer'
import BuyTradeAdvertisementsHeader from '../layouts/BuyTradeAdvertisementsHeader'

import BrowserWalletLockedAlert from './../../generic-components/BrowserWalletLockedAlert'
import WrongNetwork from './../../layouts/wrongnetwork/WrongNetwork'

class BuyTradeAdvertisements extends Component {
  render () {
    const BuyTradeAdvertisementLoadingDisplay = () => (
      <tbody className='flex'>
        <tr className='flex cxc mxc'>Buy Advertisements Loading...</tr>
      </tbody>
      )
    if(this.props.web3.locked || this.props.web3.wrongnetwork) {
      return(
        <div>
        { this.props.web3.locked ? <BrowserWalletLockedAlert /> : null }
        { this.props.web3.wrongnetwork ? <WrongNetwork /> : null }
        </div>
        )
    } else {
      return (
        <table>
          <BuyTradeAdvertisementsHeader />
          <div>
            { this.props.buytradeadvertisements ? <BuyTradeAdvertisementsListContainer /> : <BuyTradeAdvertisementLoadingDisplay />}
          </div>
        </table>
      )
    }
  }
}

export default BuyTradeAdvertisements
