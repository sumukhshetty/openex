import React, { Component } from 'react';
// TODO import HelpContainer

class SellOrderTradeDetailsHeader extends Component {
  render () {
    return (
      <tr className='flex list bh-white bb pa3 ma2 light-gray'>
        <th className='fb20'>Username</th>
        <th className='fb10 tc'>Payment method</th>
        <th className='fb15 tc'>Price/ether</th>
        <th className='fb5 tc'>Limits</th>
        <th className='fb15 tc'>Last Transfer</th>
        <th className='fb15 tc'>Trustworthiness</th>
        <th className='fb15 tc'>Last Online</th>
      </tr>
    );
  }
}

export default SellOrderTradeDetailsHeader;
