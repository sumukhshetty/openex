import React, { Component } from 'react'
//TODO import HelpContainer

class CancelTrade extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Resolution trade issues</h1>
            <p>Made a mistake with payment or want to try anouther seller? Never cancel if you already paid the seller.</p>
            <button>Cancel Trade</button>
          </div>
        </div>
      </main>
    )
  }
}

export default CancelTrade
