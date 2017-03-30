import React, { Component } from 'react';
// TODO import HelpContainer

class BuyOrderTradeDetailsHeader extends Component {
  render () {
    return (
      <ul className='flex list bh-white bb pa3 ma2 light-gray'>
        <li className='fb20'>Username</li>
        <li className='fb10 tc'>Payment method</li>
        <li className='fb15 tc'>Price/ether</li>
        <li className='fb5 tc'>Limits</li>
        <li className='fb15 tc'>Last Transfer</li>
        <li className='fb15 tc'>Trustworthiness</li>
        <li className='fb15 tc'>Last Online</li>
      </ul>
    );
  }
}

export default BuyOrderTradeDetailsHeader;
