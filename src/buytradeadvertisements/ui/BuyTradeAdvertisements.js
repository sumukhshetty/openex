import React, { Component } from 'react'
import * as _ from 'lodash'

import BuyTradeAdvertisemensListContainer from './BuyTradeAdvertisemensListContainer'
import BuyTradeAdvertisementsHeader from '../layouts/BuyTradeAdvertisementsHeader'

class BuyTradeAdvertisements extends Component {

  componentWillMount () {
    console.log("ui.BuyTradeAdvertisements.componentWillMount")
    this.props.onBeforeComponentLoad(this.props.user)
  }

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
          { this.props.buyorder ? <BuyTradeAdvertisemensListContainer /> : <BuyTradeAdvertisementLoadingDisplay />}
        </div>
      </table>
    )
  }
}

export default BuyTradeAdvertisements
