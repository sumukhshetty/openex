import React, { Component } from 'react';
import BrowseBuyAdvertisementContainer from './../ui/BrowseBuyAdvertisementContainer'

export default class BrowseBuyAdvertisement extends Component {

  render () {
    return (
      <BrowseBuyAdvertisementContainer buyTradeAdvertisementId={this.props.params.buyTradeAdvertisementId} />
    );
  }
}
