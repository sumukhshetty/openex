import React, { Component } from 'react'
import SellOrderTradeDetailsHeader from './SellOrderTradeDetailsHeader'
import SellOrdersList from './SellOrdersList'

class SellOrders extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <SellOrderTradeDetailsHeader/>
            <SellOrdersList/>
          </div>
        </div>
      </main>
    )
  }
}

export default SellOrders
