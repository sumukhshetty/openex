import React, { Component } from 'react'
//import ActiveTradeContainer from './../ui/ActiveTradeContainer'
import ActiveTradeHeader from './ActiveTradeHeader'
import ActiveTrade from './ActiveTrade'


class ActiveTradeContainer1 extends Component {
  render() {
    return(
      <div className="tab-listing">
        <h2>Your active escrows</h2>
        <table className="pure-table pure-table-horizontal">
          <ActiveTradeHeader />
          <ActiveTrade />
        </table>
      </div>
    )
  }
}

export default ActiveTradeContainer1
