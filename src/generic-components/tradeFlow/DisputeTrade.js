import React, { Component } from 'react'

class DisputeTrade extends Component {

  confirmDispute(){
    if(window.confirm("Are you sure you want to raise a Dispute?")){
      this.props.raiseDispute()
    }
  }

  render () {
    console.log("DisputeTrade.render")
    console.log(this.props)
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          Resolve Trade Issues
        </p>
        {this.props.viewerRole === 'buyer' ? (
          <div>
            <p>
              If the seller does not respond or there is a disagreement regarding the terms of the trade, you can dispute the trade. Ether is held safe in escrow until the dispute
              is resolved.
            </p>
            <p>
              You need to select a reason before you can dispute the trade.
            </p>
          </div>)
          : (
            <div>
              <p>
                If the buyer does not respond, does not pay or there is a disagreement regarding the terms of the trade, you can dispute this trade.
              </p>
              <p>
                Open a dispute with the button below. EZ Ether support will be in contact to resolve the dispute.
              </p>
            </div>)}
        <div className='tc'>
          <button
            className='bg-danger'
            onClick={this.confirmDispute.bind(this)}>
            Dispute Trade
          </button>
          <p />
        </div>
      </div>
    )
  }
}

export default DisputeTrade
