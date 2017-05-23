import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import DisputeTrade from '../../admin/disputeContainer'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'

class Release extends Component {

  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.order} viewerRole={this.props.viewerRole} />
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
                    {this.props.sendEtherState === 'init' &&
                      <button onClick={this.props.releaseEther}>
                        Release Ether
                      </button>}
                    {this.props.sendEtherState === 'sending' &&
                      <span>Please accept the transaction in MetaMask</span>}
                  </div>
                </div>}
              <DisputeTrade
                viewerRole={this.props.viewerRole}
                tradeId={this.props.tradeId}
                order={this.props.order}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Release
