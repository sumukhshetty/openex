import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'

class Confirmation extends Component {
  render () {
    // NOTE / TODO: above variables hold mock data

    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.params} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.tradeId}
              sellerId={this.props.sellerId}
              buyerId={this.props.buyerId} />
            <div className='w-50 ma3'>
              {this.props.viewerRole === 'buyer' &&
              <BuyerStepNote step={this.props.step} />}
              {this.props.viewerRole === 'seller' &&
              <div>
                <SellerStepNote step={this.props.step} />
                <div className='tc'>
                  <button onClick={this.props.confirmTrade}>
                   Confirm Trade
                 </button>
                </div>
              </div>}
              <CancelTrade />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Confirmation
