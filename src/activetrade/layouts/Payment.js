import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'
import DisputeTrade from '../../generic-components/tradeFlow/DisputeTrade'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'
// import Dot from '../../images/svgReactComponents/Dot.js'
// import { Link } from 'react-router'

class Payment extends Component {
  render () {
    console.log(this.props)
    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.order} viewerRole={this.props.viewerRole} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.tradeId}
              sellerId={this.props.sellerId}
              buyerId={this.props.buyerId}
              amount={this.props.amount} />
            <div className='w-50 ma3'>
              {this.props.viewerRole === 'buyer' &&

                <div>
                  <BuyerStepNote step={this.props.step} order={this.props.order} />
                  <div className='tc'>
                    <button onClick={this.props.confirmPayment}>
                      Confirm Payment
                    </button>
                  </div>
                  <CancelTrade />
                </div>
              }
              {this.props.viewerRole === 'seller' &&
                <div>
                  <SellerStepNote step={this.props.step} />
                  <DisputeTrade
                    viewerRole={this.props.viewerRole}
                    tradeId={this.props.tradeId}
                    sellerId={this.props.order.sellerUid}
                    buyerId={this.props.order.buyerUid}
                    buyerUsername={this.props.order.buyerUsername}
                    sellerUsername={this.props.order.sellerUsername}
                    amount={this.props.order.amount} />
                </div>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Payment
