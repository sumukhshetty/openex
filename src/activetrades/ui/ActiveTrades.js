import React, { Component } from 'react'
import * as _ from 'lodash'

import ActiveTradesListContainer from './ActiveTradesListContainer'

class ActiveTrades extends Component {

  render () {
    const ActiveTradesLoadingDisplay = () => (
      <tbody className='flex'>
        <tr className='flex cxc mxc'>Loading Active Trades...</tr>
      </tbody>
      )
    return (
      <table>
        <div>
          { this.props.activetrades ? <ActiveTradesListContainer /> : <ActiveTradesLoadingDisplay />}
        </div>
      </table>
    )
  }
}

export default ActiveTrades
