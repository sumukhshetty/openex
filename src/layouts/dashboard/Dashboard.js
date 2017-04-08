import React, { Component } from 'react'
import DashboardInfoMessage from './DashboardInfoMessage'
import ActiveEscrowList from './../../activeescrowlist/layouts/ActiveEscrowList'
import AdList from './../../adlist/layouts/AdList'

import TradeAdvertisementContainer from '../../tradeadvertisement/layouts/TradeAdvertisementContainer'


class Dashboard extends Component {
  render() {
    return(
      <section className="dashboard">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
              <DashboardInfoMessage />
              <ActiveEscrowList />
              <AdList />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Dashboard
