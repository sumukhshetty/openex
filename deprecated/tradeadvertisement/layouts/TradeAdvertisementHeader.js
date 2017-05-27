import React, { Component } from 'react'
//TODO import HelpContainer

class TradeAdvertisementHeader extends Component {
  render() {
    return(
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Info</th>
          <th>Country</th>
          <th>Payment Method</th>
          <th>Price</th>
          <th>Units</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
    )
  }
}

export default TradeAdvertisementHeader
