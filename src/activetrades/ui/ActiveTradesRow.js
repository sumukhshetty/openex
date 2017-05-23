import React, { Component } from 'react'
import ViewActiveTradeButton from '../layouts/ViewActiveTradeButton'

class ActiveTradeRow extends Component {

  // ISSUE-231-31: orderId is changed to purchaseRequestId
  componentWillMount () {
    //this.props.onBeforeComponentLoads(this.props.orderId, this.props.tradeType)
  }
  render () {
    // ISSUE-231-34: This ActiveTradesRow should be given the data
    // of the purchaseRequest as a prop - all of the activeTradeData
    // should be replaced with a purchaseRequest obj
    // ISSUE-231-32: orderId is changed to purchaseRequestId
    if (this.props.purchaseRequest) {
      // ISSUE-231-33: orderId is changed to purchaseRequestId
      var purchaseRequest = this.props.purchaseRequest
      var display_id
      if (purchaseRequest.contractAddress) {
        display_id = purchaseRequest.contractAddress.slice(2, 6)
      } else {
        display_id = '-'
      }
      var tradeType = (purchaseRequest.tradeAdvertisementType === 'buy-ether') ? 'Buy Order' : 'Sell Order'
      var username
      if (purchaseRequest.buyerUid === this.props.user.data.uid) {
        username = purchaseRequest.sellerUsername
      } else {
        username = purchaseRequest.buyerUsername
      }
      return (
        <tr className='flex cxc'>
          <td className='fb5 tc'>{display_id}</td>
          <td className='fb15 tc'>{purchaseRequest.lastUpated}</td>
          <td className='fb10 tc'>{tradeType}</td>
          <td className='fb15 tc'>{username}</td>
          <td className='fb10 tc'>{purchaseRequest.amount}</td>
          <td className='fb10 tc'>{purchaseRequest.amount}</td>
          <td className='fb10 tc'>{purchaseRequest.status}</td>
          <td className='fb10 tc'><i className='icon'>greendot</i> Active</td>
          <ViewActiveTradeButton purchaseRequest={purchaseRequest} purchaseRequestId={this.props.purchaseRequestId} tradeType={purchaseRequest.tradeAdvertisementType} />
        </tr>
      )
    } else {
      return (
        null
      )
    }
  }
}

export default ActiveTradeRow
