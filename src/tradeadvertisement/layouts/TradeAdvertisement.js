import React, { Component } from 'react'
//import ActiveTradeContainer from './../ui/ActiveTradeContainer'
import EditTradeAdvertisementButton from './EditTradeAdvertisementButton'

class TradeAdvertisement extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>TradeAdvertisement</h1>
            <EditTradeAdvertisementButton/>
          </div>
        </div>
      </main>
    )
  }
}

export default TradeAdvertisement
