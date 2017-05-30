import React, { Component } from 'react';
import BuyTradeAdvertisementContainer from './../ui/BuyTradeAdvertisementContainer'

export default class BuyTradeAdvertisement extends Component {

  render () {
    return (
      <BuyTradeAdvertisementContainer buyTradeAdvertisementId={this.props.params.buyTradeAdvertisementId} />
    );
  }
}
