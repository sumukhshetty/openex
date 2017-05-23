import React, { Component } from 'react'
import { firebaseRef } from '../../index.js'
import { browserHistory } from 'react-router'

class DisputeTrade extends Component {

  constructor (props) {
    super(props)
    this.disputeTheTrade = this.disputeTheTrade.bind(this)
  }

  disputeTheTrade () {
    firebaseRef.database()
      .ref('/disputes')
      .push({
        time: +new Date(),
        status: 'Disputed',
        amount: this.props.order.amount,
        tradeId: this.props.tradeId,
        tradeType: this.props.activeTrades.activeTrades[this.props.tradeId].tradeType,
        seller: {
          uid: this.props.order.sellerUid,
          name: this.props.order.sellerUsername},
        buyer: {
          uid: this.props.order.buyerUid,
          name: this.props.order.buyerUsername},
        ether: 'fix me',
        id: 'fix me',
        raisedBy: firebaseRef.auth().currentUser.uid
      }).then(() => browserHistory.push('/dashboard'))
  }

  render () {
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
                Open a dispute with the button below. Automte support will be in contact to resolve the dispute.
              </p>
            </div>)}
        <div className='tc'>
          <button
            className='bg-danger'
            onClick={this.disputeTheTrade}>
            Dispute Trade
          </button>
          <p />
        </div>
      </div>
    )
  }
}

export default DisputeTrade
