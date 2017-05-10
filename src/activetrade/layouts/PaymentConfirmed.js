import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import DisputeTrade from '../../generic-components/tradeFlow/DisputeTrade'
import BuyerStepNote from '../ui/BuyerStepNoteBuy'
import SellerStepNote from '../ui/SellerStepNoteBuy'

class PaymentConfirmed extends Component {

  componentWillUnmount () {
    this.props.resetEtherState()
  }

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
                <BuyerStepNote step={this.props.step} contractAddress={this.props.contractAddress} />}
              {this.props.viewerRole === 'seller' &&
                <div>
                  <SellerStepNote step={this.props.step} contractAddress={this.props.contractAddress} />
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
                sellerId={this.props.order.sellerUid}
                buyerId={this.props.order.buyerUid}
                buyerUsername={this.props.order.buyerUsername}
                sellerUsername={this.props.order.sellerUsername}
                amount={this.props.order.amount} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default PaymentConfirmed
