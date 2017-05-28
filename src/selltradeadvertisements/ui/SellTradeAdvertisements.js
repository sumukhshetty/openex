import React, { Component } from 'react'
import * as _ from 'lodash'

import SellTradeAdvertisementsListContainer from './SellTradeAdvertisementsListContainer'
import SellTradeAdvertisementsHeader from '../layouts/SellTradeAdvertisementsHeader'

import BrowserWalletLockedAlert from './../../generic-components/BrowserWalletLockedAlert'
import WrongNetwork from './../../layouts/wrongnetwork/WrongNetwork'

class SellTradeAdvertisements extends Component {

  render () {
    const SellTradeAdvertisementsLoadingDisplay = () => (<tbody className='flex'>
  {/*TODO show the your the first instead fo loding sell trade advertisements*/}
      <tr className='flex cxc mxc'>Loading Sell Trade Advertisements...</tr>
    </tbody>)
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
          <SellTradeAdvertisementsHeader />
          <div>
            { this.props.selltradeadvertisements.data ? <SellTradeAdvertisementsListContainer /> : <SellTradeAdvertisementsLoadingDisplay />}
          </div>
        </table>
      )
    }
  }
}

export default SellTradeAdvertisements
