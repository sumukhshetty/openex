import React, { Component } from 'react'
//import ActiveTradeContainer from './../ui/ActiveTradeContainer'
import TradeAdvertisementHeader from './TradeAdvertisementHeader'
import TradeAdvertisement from './TradeAdvertisement'
import CreateTradeAdvertisementButton from './CreateTradeAdvertisementButton'


class TradeAdvertisementContainer extends Component {
  render() {
    return(
      <div className="tab-listing">
        <h2>Your Trade Advertisements</h2>
        <table className="pure-table pure-table-horizontal">
          <TradeAdvertisementHeader />
          <TradeAdvertisement />
        </table>
        <CreateTradeAdvertisementButton/>
      </div>
    )
  }
}

export default TradeAdvertisementContainer
