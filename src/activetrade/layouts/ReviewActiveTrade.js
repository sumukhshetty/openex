import React, { Component } from 'react'
import ActiveTradeInfo from './ActiveTradeInfo'
import ActiveTradeProgress from './ActiveTradeProgress'
import MakePaymentButton from './MakePaymentButton'
import ChatMessages from './ChatMessages'
import NewChatMessage from './NewChatMessage'

class ReviewActiveTrade extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <ActiveTradeInfo />
            <ActiveTradeProgress />
            <MakePaymentButton />
            <ChatMessages />
            <NewChatMessage />
          </div>
        </div>
      </main>
    )
  }
}

export default ReviewActiveTrade
