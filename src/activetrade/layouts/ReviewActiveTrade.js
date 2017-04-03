import React, { Component } from 'react'
import ActiveTradeInfo from './ActiveTradeInfo'
import ActiveTradeProgress from './ActiveTradeProgress'
import StepNote from './StepNote';
import MakePaymentButton from './MakePaymentButton'
import ChatMessages from './ChatMessages'
import NewChatMessage from './NewChatMessage'
import TradeFeedbackContainer from './../../tradefeedback/TradeFeedbackContainer'
import ReleaseEther from './../../releaseether/ReleaseEther'
import DisputeTrade from './../../disputetrade/DisputeTrade'
import CancelTrade from './../../canceltrade/CancelTrade'

class ReviewActiveTrade extends Component {
  render() {

    const progress_map = [
      { status: 'completed', label: '', text: 'Escrow' },
      { status: 'active', label: '', text: 'Payment' },
      { status: '', label: '', text: 'Ether Released' }
    ]
    const step = "payment";
    // NOTE / TODO: above variables hold mock data

    return(
      <section className="activeTrade">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
              <ActiveTradeInfo />
              <ActiveTradeProgress progress_map={progress_map} />
              <StepNote step={step} />
              <MakePaymentButton />
              <ChatMessages />
              <NewChatMessage />
              <ReleaseEther />
              <CancelTrade />
              <DisputeTrade />
              <TradeFeedbackContainer />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ReviewActiveTrade
