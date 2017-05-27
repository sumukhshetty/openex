import React, { Component } from 'react'
import BuyOrderDetailContainer from './../ui/BuyOrderDetailContainer'

class BuyOrderDetail extends Component {
  render() {

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Order Detail</h1>
            <p>Details for specific order</p>
            <BuyOrderDetailContainer uid={this.props.authData.uid} params={this.props.params}/>
          </div>
        </div>
      </main>
    )
  }
}

export default BuyOrderDetail
