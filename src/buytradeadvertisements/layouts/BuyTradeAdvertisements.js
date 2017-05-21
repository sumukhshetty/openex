// ISSUE-231-70: This replaces buyorders

import React, { Component } from 'react'
import BuyTradeAdvertisementContainer from './../ui/BuyTradeAdvertisementContainer'

export default class BuyOrders extends Component {
  render () {
    return (
      <div className='w-100 bg-smoke'>
        <div className='w-75 center'>
          <BuyTradeAdvertisementContainer />
        </div>
      </div>
    )
  }
}
