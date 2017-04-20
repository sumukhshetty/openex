import React, { Component } from 'react'
import SellOrderDetailContainer from './../ui/SellOrderDetailContainer'

class SellOrderDetail extends Component {
  render() {

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Order Detail</h1>
            <p>Details for specific order</p>
            <SellOrderDetailContainer uid={this.props.authData.uid} params={this.props.params}/>
          </div>
        </div>
      </main>
    )
  }
}

export default SellOrderDetail
