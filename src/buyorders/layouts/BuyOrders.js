import React, { Component } from 'react'
import BuyOrdersContainer from './../ui/BuyOrdersContainer'

class BuyOrders extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Buy Orders</h1>
            <p>The buy orders out on the exchange</p>
            <BuyOrdersContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default BuyOrders
