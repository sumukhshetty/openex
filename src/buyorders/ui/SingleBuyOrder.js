import React, { Component } from 'react'
import * as _ from 'lodash'

class SingleBuyOrder extends Component {

  render(){

    return (
      <div>
        <p>{this.props.orderId}</p>
        <p>{this.props.buyOrderData.amount}</p>
      </div>)
  }
}

export default SingleBuyOrder