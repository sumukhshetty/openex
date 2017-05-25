import React, { Component } from 'react'

import TradeAdvertisementRow from './TradeAdvertisementRowContainer'
import TradeAdvertisementsEmptyState from './../layouts/TradeAdvertisementsEmptyState'
//import ActiveAdContainer from './ActiveAdContainer'
//import AdListEmptyState from './AdListEmptyState'

class TradeAdvertisements extends Component {

    render() {
      // ISSUE-231-9: this.props.activeAds.activeAds should be changed to this.props.activeAds.data
      var tradeadvertisements = this.props.tradeadvertisements
      if(tradeadvertisements){
        var buyrows = [];
        var sellrows = [];
        Object.entries(tradeadvertisements.data.buyether).forEach(
            ([key, value]) => {
              buyrows.push(<TradeAdvertisementRowContainer tradeAdvertisement={this.props.buytradeadvertisements.data[key]} tradeAdvertisementId={key} key={key} tradeType='buy-ether'/>)}
        );
        Object.entries(tradeadvertisements.data.sellether).forEach(
            ([key, value]) => {
              sellrows.push(<TradeAdvertisementRowContainer tradeAdvertisement={this.props.selltradeadvertisements.data[key]} tradeAdvertisementId={key} key={key} tradeType='sell-ether'/>)}
        );
        return(
          <tbody>
          {buyrows}
          {sellrows}
          </tbody>
        )
      } else {
        return(
          <tbody>
            <TradeAdvertisementsEmptyState/>
          </tbody>
        )
      }
  }
}

export default TradeAdvertisements
