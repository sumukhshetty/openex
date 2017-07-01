import React, { Component } from 'react'
import ViewActiveTradeButton from '../layouts/ViewActiveTradeButton'
import { browserHistory } from 'react-router'

class ActiveTradeRow extends Component {

  render () {
    if (this.props.purchaseRequest) {
      var purchaseRequest = this.props.purchaseRequest
      var tradeType = (purchaseRequest.tradeAdvertisementType === 'buy-ether') ? 'Buy Order' : 'Sell Order'
      var username, uid, url
      if (purchaseRequest.buyerUid === this.props.user.data.uid) {
        username = purchaseRequest.sellerUsername
        uid = purchaseRequest.sellerUid
      } else {
        username = purchaseRequest.buyerUsername
        uid = purchaseRequest.buyerUid
      }
      url = '/user/' + uid
      return (
        <tr className='flex cxc'>
          <td className='fb5 tc'>{this.props.purchaseRequestId.slice(1,6)}</td>
          <td className='fb15 tc'>{purchaseRequest.lastUpdated}</td>
          <td className='fb10 tc'>{tradeType}</td>
          <td className='fb15 tc'><a onClick={()=>browserHistory.push(url)}>{username}</a></td>
          <td className='fb10 tc'>{purchaseRequest.etherAmount}</td>
          <td className='fb10 tc'>{purchaseRequest.fiatAmount}</td>
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
