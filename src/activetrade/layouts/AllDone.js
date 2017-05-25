import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import TradeFeedback from './../../tradefeedback/layouts/TradeFeedback'

class AllDone extends Component {

  render () {
    const progressMap = [
      { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
      { status: 'completed', label: '', text: 'Awaiting Payment' },
      { status: 'completed', label: '', text: 'Awaiting Release' },
      { status: 'completed', label: '', text: 'All Done' }
    ]

    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo activetrade={this.props.activetrade} viewerRole={this.props.viewerRole} />
          <Progress progress_map={progressMap} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.purchaseRequestId}
              sellerId={this.props.sellerId}
              buyerId={this.props.buyerId} />
            <div className='w-50 ma3'>
              <TradeFeedback sellerId={this.props.seller.data.uid} buyerId={this.props.buyer.data.uid} purchaseRequestId={this.props.purchaseRequestId}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default AllDone
