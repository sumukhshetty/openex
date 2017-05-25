import React, { Component } from 'react'

class ActiveTradeInfo extends Component {
  render () {
    var _activetrade = this.props.activetrade
    // TODO change the display from the contractAddress to the txHash
    var display_id
    if (_activetrade.contractAddress){
      display_id = _activetrade.contractAddress.slice(2,6)
    } else {
      display_id = "-"
    }

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
      <p className='flarge ma0 pt5 b measure-wide'>
        Contract {display_id}: {action} {_activetrade.amount} ether for {_activetrade.amount * _activetrade.price} {_activetrade.currency} with {_activetrade.paymentMethod} payment. {action2} {user} at the exchange
        rate {_activetrade.price} {_activetrade.currency} / ether.
      </p>
    )
  }
}

export default ActiveTradeInfo
