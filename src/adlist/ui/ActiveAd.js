import React, { Component } from 'react';
// TODO import HelpContainer
import ViewActiveAdButton from './ViewActiveAdButton';

class ActiveAd extends Component {
  componentWillMount () {
    console.log(this.props.orderId);
  }
  render () {
    return (
      <tr>
        <td className='fb5 tc'>
          1238
        </td>
        <td className='fb15 tc'>
          10 Oct, 2017, 7:45 am
        </td>
        <td className='fb10 tc'>
          Online Sell
        </td>
        <td className='fb15 tc'>
          David Washington
        </td>
        <td className='fb10 tc'>
          5
        </td>
        <td className='fb10 tc'>
          10000
        </td>
        <td className='fb10 tc'>
          In Escrow
        </td>
        <td className='fb10 tc'>
          <i className='icon'>greendot</i> Active
        </td>
        <ViewActiveAdButton orderId={this.props.orderId} />
      </tr>
    );
  }
}

export default ActiveAd;
