import React, { Component } from 'react'
import TradeFeedbackContainer from './../ui/TradeFeedbackContainer'

export default class TradeFeedback extends Component {
  render () {
    return (
      <div className='measure pv4'>
          <TradeFeedbackContainer purchaseRequestId={this.props.purchaseRequestId} sellerId={this.props.sellerId} buyerId={this.props.buyerId} />
      </div>
    );
  }
}
