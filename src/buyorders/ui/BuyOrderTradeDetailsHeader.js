import React, { Component } from 'react';
// TODO import HelpContainer

class BuyOrderTradeDetailsHeader extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th className='fb20'>Username</th>
          <th className='fb10 tc'>Payment method</th>
          <th className='fb15 tc'>Amount</th>
          <th className='fb5 tc'>Limits</th>
          <th className='fb15 tc'>Last Transfer</th>
          <th className='fb15 tc'>Trustworthiness</th>
          <th className='fb15 tc'>Last Online</th>
        </tr>
      </thead>
    );
  }
}

export default BuyOrderTradeDetailsHeader;
