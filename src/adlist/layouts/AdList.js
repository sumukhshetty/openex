import React, { Component } from 'react'

import AdListContainer from './../ui/AdListContainer'
import ActiveTradeHeader from './../../activetrade/layouts/ActiveTradeHeader'

class AdList extends Component {
  render() {
    return(
      <div className="tab-listing">
        <h2>Your advertisements</h2>
        <table className="pure-table pure-table-horizontal">
          <ActiveTradeHeader />
          <AdListContainer />
        </table>
      </div>
    )
  }
}

export default AdList
