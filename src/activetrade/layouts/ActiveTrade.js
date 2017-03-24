import React, { Component } from 'react'
//TODO import HelpContainer
import ViewActiveTradeButton from './ViewActiveTradeButton'

class ActiveTrade extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>ActiveTrade1</h1>
            <ViewActiveTradeButton />
          </div>
        </div>
      </main>
    )
  }
}

export default ActiveTrade
