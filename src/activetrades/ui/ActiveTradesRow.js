import React, { Component } from 'react'
import ViewActiveTradeButton from '../layouts/ViewActiveTradeButton'
import LastOnline from '../../generic-components/tables/LastOnline.js'
import { browserHistory } from 'react-router'

class ActiveTradeRow extends Component {

  render () {
    if (this.props.purchaseRequest && this.props.presence.data) {
      var purchaseRequest = this.props.purchaseRequest
      var tradeType = (purchaseRequest.tradeAdvertisementType === 'buy-ether') ? 'Buy Order' : 'Sell Order'
      var username, uid, url, _presence
      if (purchaseRequest.buyerUid === this.props.user.data.uid) {
        username = purchaseRequest.sellerUsername
        uid = purchaseRequest.sellerUid
        _presence = this.props.presence.data[uid]
      } else {
        username = purchaseRequest.buyerUsername
        uid = purchaseRequest.buyerUid
        _presence = this.props.presence.data[uid]
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
          {/*<td className='fb10 tc'><i className='icon'>greendot</i> Active</td>*/}
          <LastOnline time={_presence} />
          <ViewActiveTradeButton purchaseRequest={purchaseRequest} purchaseRequestId={this.props.purchaseRequestId} tradeType={purchaseRequest.tradeAdvertisementType} countryCode={this.props.user.profile.country}/>
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
