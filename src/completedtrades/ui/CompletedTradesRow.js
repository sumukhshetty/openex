import React, { Component } from 'react'
import ViewCompletedTradeButton from '../layouts/ViewCompletedTradeButton'

class CompletedTradeRow extends Component {

  render () {
    console.log("CompletedTradeRow.render")
    console.log(this.props.purchaserequests)
    if (this.props.purchaserequests.data[this.props.purchaseRequestId]) {
      var purchaseRequest = this.props.purchaserequests.data[this.props.purchaseRequestId]
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
          <ViewCompletedTradeButton purchaseRequestId={this.props.purchaseRequestId} tradeType={purchaseRequest.tradeAdvertisementType} />
        </tr>
      )
    } else {
      return (
        null
      )
    }
  }
}

export default CompletedTradeRow
