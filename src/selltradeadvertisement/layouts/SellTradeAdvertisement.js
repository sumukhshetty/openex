import React, { Component } from 'react';
import SellTradeAdvertisementContainer from './../ui/SellTradeAdvertisementContainer'

export default class SellTradeAdvertisement extends Component {

  render () {
    return (
      <SellTradeAdvertisementContainer sellTradeAdvertisementId={this.props.params.sellTradeAdvertisementId} />
    );
  }
}
