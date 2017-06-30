import React, { Component } from 'react'

class ActiveTradeInfo extends Component {
  render () {
    var _activetrade = this.props.activetrade

    var action, action2, user;
    if(this.props.viewerRole === 'seller') {
      action = 'Selling'
      action2 = 'Selling to'
      user = _activetrade.buyerUsername
    } else {
      action = 'Buying'
      action2 = 'Buying from'
      user = _activetrade.sellerUsername
    }
    return (
      //TODO check the pricing here
      <p className='flarge ma0 pt5 b measure-wide'>
        Contract {this.props.displayId}: {action} {_activetrade.etherAmount} ether for {_activetrade.fiatAmount} {_activetrade.currency} with {_activetrade.paymentMethod} payment. {action2} {user} at the exchange
        rate {_activetrade.price} {_activetrade.currency} / ether.
      </p>
    )
  }
}

export default ActiveTradeInfo
