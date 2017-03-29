import React, { Component } from 'react'
//TODO import HelpContainer
import ViewActiveTradeButton from './ViewActiveTradeButton'

class ActiveTrade extends Component {
  render() {
    return(
      <tbody>
        <tr>
          <td>1238</td>
          <td>10 Oct, 2017, 7:45 am</td>
          <td>Online Sell</td>
          <td>David Washington</td>
          <td>5</td>
          <td>10000</td>
          <td>In Escrow</td>
          <td><i class='icon'>greendot</i> Active</td>
          <ViewActiveTradeButton />
        </tr>
      </tbody>
    )
  }
}

export default ActiveTrade
