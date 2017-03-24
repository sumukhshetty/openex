import React, { Component } from 'react'
//TODO import HelpContainer

class ActiveTradeHeader extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <li>#</li>
            <li>Created at</li>
            <li>Info</li>
            <li>Username</li>
            <li>Ether</li>
            <li>Amount</li>
            <li>Status</li>
            <li>Last Online</li>
          </div>
        </div>
      </main>
    )
  }
}

export default ActiveTradeHeader
