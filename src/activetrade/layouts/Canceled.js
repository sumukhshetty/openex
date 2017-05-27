import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import BuyerStepNote from '../ui/BuyerStepNoteSell'
import SellerStepNote from '../ui/SellerStepNoteSell'

class Canceled extends Component {

  componentWillUnmount() {
    this.props.resetEtherState();
  }

  render () {
    console.log("Canceled.render")
    console.log(this.props)
    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo activetrade={this.props.activetrade} viewerRole={this.props.viewerRole} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.purchaseRequestId}
              sellerId={this.props.activetrade.sellerUid}
              buyerId={this.props.activetrade.buyerUid} />
            <div className='w-50 ma3'>
              {this.props.viewerRole === 'buyer' &&
              <div>
              <BuyerStepNote step={this.props.step} />
              </div>
            }
              {this.props.viewerRole === 'seller' &&
              <div>
                <SellerStepNote step={this.props.step} />
              </div>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Canceled
