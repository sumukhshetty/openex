import React, { Component } from 'react';
import BrowseSellAdvertisementContainer from './../ui/BrowseSellAdvertisementContainer'

export default class BrowseSellAdvertisement extends Component {

  render () {
    console.log('layouts.BrowseSellAdvertisement.render')
    return (
      <BrowseSellAdvertisementContainer sellTradeAdvertisementId={this.props.params.sellTradeAdvertisementId} />
    );
  }
}
