import React, { Component } from 'react'
//TODO import HelpContainer

class TradeAdvertisementHeader extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <li>#</li>
            <li>Status</li>
            <li>Info</li>
            <li>Country</li>
            <li>Payment Method</li>
            <li>Price</li>
            <li>Units</li>
          </div>
        </div>
      </main>
    )
  }
}

export default TradeAdvertisementHeader
