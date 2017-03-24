import React, { Component } from 'react'
//import ActiveTradeContainer from './../ui/ActiveTradeContainer'
import ActiveTradeHeader from './ActiveTradeHeader'
import ActiveTrade from './ActiveTrade'


class ActiveTradeContainer1 extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Your active escrows</h1>
            <ActiveTradeHeader />
            <ActiveTrade />
          </div>
        </div>
      </main>
    )
  }
}

export default ActiveTradeContainer1
