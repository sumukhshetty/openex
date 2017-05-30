// ISSUE-231-41: This component should be changed to ActiveTradeRow, there should be an layouts/activeTradeRow
import React, { Component } from 'react'
import ViewActiveTradeButton from '../../activetrade/layouts/ViewActiveTradeButton'

class ActiveTrade extends Component {
  // ISSUE-231-30: the constructor is removed
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      activeTradeData: this.props.activeTradeData,
      orderId: this.props.orderId,
      tradeType: this.props.tradeType
    }
  }
  // ISSUE-231-31: orderId is changed to purchaseRequestId
  componentWillMount () {
    this.props.onBeforeComponentLoads(this.props.orderId, this.props.tradeType)
  }
  render () {
    // ISSUE-231-34: This ActiveTradeComponent should be given the data
    // of the purchaseRequest as a prop - all of the activeTradeData
    // should be replaced with a purchaseRequest obj
    // ISSUE-231-32: orderId is changed to purchaseRequestId
    if (this.props.activeTradeData.activeTradeData[this.props.orderId]) {
      // ISSUE-231-33: orderId is changed to purchaseRequestId
      var tradeDetails = this.props.activeTradeData.activeTradeData[this.props.orderId]
      var display_id
      if (tradeDetails.contractAddress) {
        display_id = tradeDetails.contractAddress.slice(2, 6)
      } else {
        display_id = '-'
      }
      var tradeType = (this.props.tradeType === 'buy-ether') ? 'Buy Order' : 'Sell Order'
      var username
      if (tradeDetails.buyerUid === this.props.user.data.uid) {
        username = tradeDetails.sellerUsername
      } else {
        username = tradeDetails.buyerUsername
      }
      return (
        <tr className='flex cxc'>
          <td className='fb5 tc'>{display_id}</td>
          <td className='fb15 tc'>{tradeDetails.lastUpated}</td>
          <td className='fb10 tc'>{tradeType}</td>
          <td className='fb15 tc'>{username}</td>
          <td className='fb10 tc'>{tradeDetails.amount}</td>
          <td className='fb10 tc'>{tradeDetails.amount}</td>
          <td className='fb10 tc'>{tradeDetails.status}</td>
          <td className='fb10 tc'><i className='icon'>greendot</i> Active</td>
          <ViewActiveTradeButton orderId={this.props.orderId} tradeType={tradeDetails.tradeType} />
        </tr>
      )
    } else {
      return (
        null
      )
    }
  }
}

export default ActiveTrade
