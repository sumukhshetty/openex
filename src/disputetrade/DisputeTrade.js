import React, { Component } from 'react'
//TODO import HelpContainer

class DisputeTrade extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <p>If the seller does not respond or there is a disagreement regarding the terms of the trade, you can dispute the trade. Ether is held safe in escrow until the dispute is resolved. </p>
            <p>You need to select a reason before you can dispute the trade.</p>

            <p>If the buyer does not respond, does not pay or there is a disagreement regarding the terms of the trade, you can dispute this trade.</p>
            <p>Open a dispute with the button below. Automte support will be in contact to resolve the dispute.</p>
            <button>Dispute Trade</button>
          </div>
        </div>
      </main>
    )
  }
}

export default DisputeTrade
