import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import DisputeTrade from '../../generic-components/tradeFlow/DisputeTrade'
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'
import BuyerStepNote from '../ui/BuyerStepNoteBuy'
import SellerStepNote from '../ui/SellerStepNoteBuy'

class InEscrow extends Component {

  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.order} viewerRole={this.props.viewerRole} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.order.orderId}
              sellerId={this.props.order.sellerUid}
              buyerId={this.props.order.buyerUid} />
            <div className='w-50 ma3'>
              {this.props.viewerRole === 'buyer' &&

                <div>
                  <BuyerStepNote step={this.props.step} order={this.props.order}/>
                  <div className='tc'>
                    <button onClick={this.props.confirmPayment}>
                   Confirm Payment
                 </button>
                  </div>
                </div>
              }
              {this.props.viewerRole === 'seller' &&
              <SellerStepNote step={this.props.step} />}
              {this.props.viewerRole === 'seller' &&
              <DisputeTrade viewerRole={this.props.viewerRole}/>}
              {this.props.viewerRole === 'buyer' &&
              <CancelTrade />}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default InEscrow
