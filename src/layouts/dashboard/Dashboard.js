import React, { Component } from 'react'
import DashboardInfoMessage from './DashboardInfoMessage'
import ActiveTradeContainer from '../../activetrade/layouts/ActiveTradeContainer'
import TradeAdvertisementContainer from '../../tradeadvertisement/layouts/TradeAdvertisementContainer'


class Dashboard extends Component {
  render() {
    return(
      <section className="dashboard">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
              <DashboardInfoMessage />
              <ActiveTradeContainer />
              <TradeAdvertisementContainer/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Dashboard
