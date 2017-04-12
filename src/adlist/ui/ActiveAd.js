import React, { Component } from 'react'
//TODO import HelpContainer
import ViewActiveAdButton from './ViewActiveAdButton'
import { browserHistory } from 'react-router'

class ActiveAd extends Component {
  componentWillMount(){
    console.log(this.props.orderId)
  }
  render() {
    return(
        <tr>
          <td>1238</td>
          <td>10 Oct, 2017, 7:45 am</td>
          <td>Online Sell</td>
          <td>David Washington</td>
          <td>5</td>
          <td>10000</td>
          <td>In Escrow</td>
          <td><i className='icon'>greendot</i> Active</td>
          <ViewActiveAdButton orderId={this.props.orderId} tradeType={this.props.tradeType}/>
        </tr>
    )
  }
}

export default ActiveAd
