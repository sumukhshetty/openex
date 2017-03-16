import React, { Component } from 'react'
import OrderDetailContainer from './../ui/OrderDetailContainer'

class OrderDetail extends Component {
  render() {
    console.log("render of OrderDetail - props.params: " + this.props.params.address);

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Order Detail</h1>
            <p>Details for specific order</p>
            <OrderDetailContainer params={this.props.params}/>
          </div>
        </div>
      </main>
    )
  }
}

export default OrderDetail
