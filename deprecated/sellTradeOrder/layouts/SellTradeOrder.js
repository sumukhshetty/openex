// ISSUE-231-75: This changes to sellTradeAdvertisement
import React, { Component } from 'react';
import SellTradeOrderContainer from './../ui/SellTradeOrderContainer'

export default class SellTradeOrder extends Component {

  render () {
    return (
      <SellTradeOrderContainer uid={this.props.authData.uid} params={this.props.params} />
    );
  }
}
