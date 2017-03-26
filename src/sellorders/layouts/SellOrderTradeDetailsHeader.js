import React, { Component } from 'react'
//TODO import HelpContainer

class SellOrderTradeDetailsHeader extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <li>Username</li>
            <li>Payment method</li>
            <li>Price/ether</li>
            <li>Limits</li>
            <li>Last Transfer</li>
            <li>Trustworthiness</li>
            <li>Last Online</li>
          </div>
        </div>
      </main>
    )
  }
}

export default SellOrderTradeDetailsHeader
