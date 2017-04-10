import React, { Component } from 'react';
// TODO import HelpContainer
import ViewActiveTradeButton from './ViewActiveTradeButton';
import { browserHistory } from 'react-router';

class ActiveTrade extends Component {
  // componentWillMount(){
  //   console.log(this.props.orderId)
  // }
  render () {
    return (
      <tr>
        <td className='fb20'>1238</td>
        <td className='fb10 tc'>10 Oct, 2017, 7:45 am</td>
        <td className='fb15 tc'>Online Sell</td>
        <td className='fb5 tc'>David Washington</td>
        <td className='fb15 tc'>5</td>
        <td className='fb5 tc'>10000</td>
        <td className='fb5 tc'>In Escrow</td>
        <td className='fb5 tc'><i className='icon'>greendot</i> Active</td>
        <ViewActiveTradeButton orderId={this.props.orderId} />
      </tr>
    );
  }
}

export default ActiveTrade;
