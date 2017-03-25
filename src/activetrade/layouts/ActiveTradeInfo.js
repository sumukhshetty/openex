import React, { Component } from 'react'
//TODO import HelpContainer

class ActiveTradeInfo extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <p>Contract #1234: Buying 5 ether for 2000000.00 INR with UPI payment. Buying from advertisement $440646 (IMPS Bank Transfer India) by Victoria Padilla at the exchange rate 2000 INR / ether</p>
          </div>
        </div>
      </main>
    )
  }
}

export default ActiveTradeInfo
