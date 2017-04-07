import React, { Component } from 'react'

import ActiveEscrowListContainer from './../ui/ActiveEscrowListContainer'
import ActiveTradeHeader from './../../activetrade/layouts/ActiveTradeHeader'

class ActiveEscrowList extends Component {
  render() {
    return(
      <div className="tab-listing">
        <h2>Your active escrows</h2>
        <table className="pure-table pure-table-horizontal">
          <ActiveTradeHeader />
          <ActiveEscrowListContainer />
        </table>
      </div>
    )
  }
}

export default ActiveEscrowList