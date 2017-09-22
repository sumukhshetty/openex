import React, { Component } from 'react'
import TradeFeedbackContainer from './../ui/TradeFeedbackContainer'

export default class TradeFeedback extends Component {
  render() {
    return (
      <div className="measure pb4">
        <TradeFeedbackContainer
          purchaseRequestId={this.props.purchaseRequestId}
          activetrade={this.props.activetrade}
          sellerRatesBuyer={this.props.sellerRatesBuyer}
          buyerRatesSeller={this.props.buyerRatesSeller}
          viewerRole={this.props.viewerRole}
        />
      </div>
    )
  }
}
