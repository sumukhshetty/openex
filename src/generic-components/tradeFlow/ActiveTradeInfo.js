import React, { Component } from 'react'
// TODO import HelpContainer

class ActiveTradeInfo extends Component {
  componentWillMount () {
    console.log('ActiveTradeInfo')
    console.log(this.props)
  }
  render () {
    var _order = this.props.params
    var display_id
    if (_order.contractAddress){
      display_id = _order.contractAddress.slice(2,6)
    } else {
      display_id = "-"
    }

    var action, action2, user;
    if(this.props.viewerRole === 'seller') {
      action = 'Selling'
      action2 = 'Selling to'
      user = _order.buyerUsername
    } else {
      action = 'Buying'
      action2 = 'Buying from'
      user = _order.sellerUsername
    }
    return (
      <p className='flarge ma0 pt5 b measure-wide'>
        Contract {display_id}: {action} {_order.amount} ether for {_order.amount * _order.price} INR with {_order.paymentMethod} payment. {action2} {user} at the exchange
        rate {_order.price} INR / ether.
      </p>
    )
  }
}

export default ActiveTradeInfo
