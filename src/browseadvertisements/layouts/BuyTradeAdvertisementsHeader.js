import React, { Component } from 'react'

class BuyTradeAdvertisementsHeader extends Component {
  render () {
    return (
      <thead>
        <tr className='flex'>
          <th className='fb20'>Username</th>
          <th className='fb10 tc'>Payment method</th>
          <th className='fb15 tc'>Price/ETH</th>
          <th className='fb5 tc'>Limits</th>
          <th className='fb15 tc'>Last Transfer</th>
          <th className='fb15 tc'>Rating</th>
          <th className='fb15 tc'>Last Online</th>
        </tr>
      </thead>
    )
  }
}

export default BuyTradeAdvertisementsHeader
