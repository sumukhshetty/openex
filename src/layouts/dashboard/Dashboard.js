import React, { Component } from 'react'
import DashboardInfoMessage from './DashboardInfoMessage'
import ActiveTradeContainer from './../../activetrade/layouts/ActiveTradeContainer'
import TradeAdvertisement from './../../tradeadvertisement/layouts/TradeAdvertisement'


class Dashboard extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <DashboardInfoMessage />
            <ActiveTradeContainer />
            <TradeAdvertisement/>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
