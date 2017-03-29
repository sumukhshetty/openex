import React, { Component } from 'react'
//TODO import HelpContainer

class ReleaseEther extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Release Ether</h1>
            <p>The buyer has not yet marked the payment complete and has 89 minutes to make the payment before the trade is automatically canceled.</p>
            <p>Buyer has marked the payment complete.</p>
            <p>When you receive the payment, release the escrow.</p>
            <button>Release ether</button>
          </div>
        </div>
      </main>
    )
  }
}

export default ReleaseEther
