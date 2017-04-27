import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import TradeFeedbackContainer from '../../generic-components/tradeFlow/TradeFeedback'

class ReviewActiveTrade extends Component {

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
          <ActiveTradeInfo params={this.props.params} />
          <Progress progress_map={progressMap} />
          <div className='flex'>
            <ChatBox
              tradeId={this.props.tradeId}
              sellerId={this.props.sellerId}
              buyerId={this.props.buyerId} />
            <div className='w-50 ma3'>
              <TradeFeedbackContainer />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ReviewActiveTrade
