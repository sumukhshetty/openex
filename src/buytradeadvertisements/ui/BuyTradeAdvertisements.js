import React, { Component } from 'react'
import * as _ from 'lodash'

import BuyTradeAdvertisementsListContainer from './BuyTradeAdvertisementsListContainer'
import BuyTradeAdvertisementsHeader from '../layouts/BuyTradeAdvertisementsHeader'

class BuyTradeAdvertisements extends Component {
  render () {
    const BuyTradeAdvertisementLoadingDisplay = () => (
      <tbody className='flex'>
        <tr className='flex cxc mxc'>Buy Advertisements Loading...</tr>
      </tbody>
      )
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

export default BuyTradeAdvertisements
