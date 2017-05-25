import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'
import DisputeTrade from '../../generic-components/tradeFlow/DisputeTrade'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'

class Payment extends Component {
  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo activetrade={this.props.activetrade} viewerRole={this.props.viewerRole} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.purchaseRequestId}
              sellerId={this.props.seller.data.uid}
              buyerId={this.props.buyer.data.uid} />
            <div className='w-50 ma3'>
              {this.props.viewerRole === 'buyer' &&

                <div>
                  <BuyerStepNote step={this.props.step} activetrade={this.props.activetrade}/>
                  <div className='tc'>
                    <button onClick={this.props.confirmPayment}>
                   Confirm Payment
                 </button>
                  </div>
                  <DisputeTrade viewerRole={this.props.viewerRole} raiseDispute={this.props.buyerRaisesDispute}/>
                </div>
              }
              {this.props.viewerRole === 'seller' &&
              <div>
              <SellerStepNote step={this.props.step} />
              <DisputeTrade viewerRole={this.props.viewerRole} raiseDispute={this.props.sellerRaisesDispute}/>
              </div>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Payment
