import React, { Component } from 'react'
import ViewCompletedTradeButton from '../layouts/ViewCompletedTradeButton'
import LastOnline from '../../generic-components/tables/LastOnline.js'

class CompletedTradesRow extends Component {

  render () {
    if (this.props.purchaserequests.data && this.props.presence.data) {
      try {
        var purchaseRequest = this.props.purchaserequests.data[this.props.purchaseRequestId]
        var tradeType = (purchaseRequest.tradeAdvertisementType === 'buy-ether') ? 'Buy Order' : 'Sell Order'
        var username, uid, _presence
        if (purchaseRequest.buyerUid === this.props.user.data.uid) {
          username = purchaseRequest.sellerUsername
          uid = purchaseRequest.sellerUid
          _presence = this.props.presence.data[uid]
        } else {
          username = purchaseRequest.buyerUsername
          uid = purchaseRequest.buyerUid
          _presence = this.props.presence.data[uid]
        }
        return (
          <tr className='flex cxc'>
            <td className='fb5 tc'>{this.props.purchaseRequestId.slice(1,6)}</td>
            <td className='fb15 tc'>{purchaseRequest.createdAt}</td>
            <td className='fb10 tc'>{tradeType}</td>
            <td className='fb15 tc'>{username}</td>
            <td className='fb10 tc'>{purchaseRequest.etherAmount}</td>
            <td className='fb10 tc'>{purchaseRequest.fiatAmount}</td>
            <td className='fb10 tc'>{purchaseRequest.status}</td>
            {/*<td className='fb10 tc'><i className='icon'>greendot</i> Active</td>*/}
            <LastOnline time={_presence} />
            <ViewCompletedTradeButton purchaseRequestId={this.props.purchaseRequestId} tradeType={purchaseRequest.tradeAdvertisementType} countryCode={this.props.countryCode}/>
          </tr>
        )
      } catch (error){
        console.log(error)
        console.log(this.props.purchaseRequestId)
        return (null)
      }
    } else {
      return (
        null
      )
    }
  }
}

export default CompletedTradesRow
