import React, { Component } from 'react'
import * as _ from 'lodash'

import SellTradeAdvertisementsListContainer from './SellTradeAdvertisementsListContainer'
import SellTradeAdvertisementsHeader from '../layouts/SellTradeAdvertisementsHeader'

class SellTradeAdvertisements extends Component {

  componentWillMount () {
    this.props.onBeforeComponentLoad(this.state.user)
  }

  render () {
    const SellTradeAdvertisementsLoadingDisplay = () => (<tbody className='flex'>
      <tr className='flex cxc mxc'>Loading Sell Trade Advertisements...</tr>
    </tbody>)
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

export default SellTradeAdvertisements
