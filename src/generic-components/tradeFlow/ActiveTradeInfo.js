import React, { Component } from 'react';
// TODO import HelpContainer

class ActiveTradeInfo extends Component {
  componentWillMount () {
    console.log('ActiveTradeInfo');
    console.log(this.props.params);
  }
  render () {
    return (
      <p className='flarge ma0 pt5 b'>
        Contract #1234: Buying 5 ether for 2000000.00 INR with UPI payment. Buying from advertisement $440646 (IMPS Bank Transfer India) by Victoria Padilla at the exchange
        rate 2000 INR / ether.
      </p>
    );
  }
}

export default ActiveTradeInfo;
