// ISSUE-231-60: this becomes a BuyTradeAdvetisement module

import React, { Component } from 'react';
import BuyTradeOrderContainer from './../ui/BuyTradeOrderContainer'

export default class BuyTradeOrder extends Component {

  render () {
    return (
      <BuyTradeOrderContainer uid={this.props.authData.uid} params={this.props.params} />
    );
  }
}
