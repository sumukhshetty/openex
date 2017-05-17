import React, { Component } from 'react'
import TradeFeedbackContainer from './../ui/TradeFeedbackContainer'

export default class TradeFeedback extends Component {
  render () {
    return (
      <div className='measure pv4'>
          <TradeFeedbackContainer orderId={this.props.orderId} sellerId={this.props.sellerId} buyerId={this.props.buyerId} />
      </div>
    );
  }
}
