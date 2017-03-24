import React, { Component } from 'react'
//import ActiveTradeContainer from './../ui/ActiveTradeContainer'
import TradeAdvertisementHeader from './TradeAdvertisementHeader'
import TradeAdvertisement from './TradeAdvertisement'
import CreateTradeAdvertisementButton from './CreateTradeAdvertisementButton'


class TradeAdvertisementContainer extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>TradeAdvertisementContainer</h1>
            <TradeAdvertisementHeader />
            <TradeAdvertisement />
            <CreateTradeAdvertisementButton/>
          </div>
        </div>
      </main>
    )
  }
}

export default TradeAdvertisementContainer
