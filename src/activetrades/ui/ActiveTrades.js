import React, { Component } from 'react'
import * as _ from 'lodash'

import ActiveTradesListContainer from './ActiveTradesListContainer'
import ActiveTradesHeader from './../layouts/ActiveTradesHeader'
import ActiveTradesListEmptyState from './../layouts/ActiveTradesListEmptyState'

class ActiveTrades extends Component {

  render () {
    if (this.props.activetrades.data){
      return (
        <table>
          <ActiveTradesHeader />
          <ActiveTradesListContainer />
        </table>
      )
    } else {
      return (
        <ActiveTradesListEmptyState />
        )
    }
  }
}

export default ActiveTrades
