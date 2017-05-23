import React, { Component } from 'react'
import * as _ from 'lodash'

import ActiveTradesListContainer from './ActiveTradesListContainer'
import ActiveTradesHeader from '../layouts/ActiveTradesHeader'

class ActiveTrades extends Component {

  componentWillMount () {
    console.log("ui.ActiveTrades.componentWillMount")
    this.props.onBeforeComponentLoad(this.props.user)
  }

  render () {
    const ActiveTradesLoadingDisplay = () => (
      <tbody className='flex'>
        <tr className='flex cxc mxc'>Loading Active Trades...</tr>
      </tbody>
      )
    return (
      <table>
        <ActiveTradesHeader />
        <div>
          { this.props.activetrades ? <ActiveTradesListContainer /> : <ActiveTradesLoadingDisplay />}
        </div>
      </table>
    )
  }
}

export default ActiveTrades
