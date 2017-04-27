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
    return (
      <p className='flarge ma0 pt5 b measure-wide'>
        Contract {display_id}: Buying {this.props.params.amount} ether for 2000000.00 INR with {_order.paymentMethod} payment. Buying from Victoria Padilla at the exchange
        rate 2000 INR / ether.
      </p>
    )
  }
}

export default ActiveTradeInfo
