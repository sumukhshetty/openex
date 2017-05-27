import React, { Component } from 'react'
import OrdersListContainer from './../ui/OrdersListContainer'

class OrdersList extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Orders List</h1>
            <p>View your orders</p>
            <OrdersListContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default OrdersList
