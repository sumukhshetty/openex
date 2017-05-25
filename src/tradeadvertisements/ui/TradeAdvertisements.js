import React, { Component } from 'react'

import TradeAdvertisementsRowContainer from './TradeAdvertisementsRowContainer'
import TradeAdvertisementsEmptyState from './../layouts/TradeAdvertisementsEmptyState'
//import ActiveAdContainer from './ActiveAdContainer'
//import AdListEmptyState from './AdListEmptyState'

class TradeAdvertisements extends Component {

    render() {
      // ISSUE-231-9: this.props.activeAds.activeAds should be changed to this.props.activeAds.data
      var tradeadvertisements = this.props.tradeadvertisements.data
      if(tradeadvertisements){
        var buyrows = [];
        var sellrows = [];
        try{
          Object.entries(tradeadvertisements.buyether).forEach(
              ([key, value]) => {
                buyrows.push(<TradeAdvertisementsRowContainer tradeAdvertisement={this.props.buytradeadvertisements.data[key]} tradeAdvertisementId={key} key={key} tradeType='buy-ether'/>)
              }
          );
        } catch(error){
          console.log(error)
        }
        try{
          console.log("trying to get the sell advertisements")
          Object.entries(tradeadvertisements.sellether).forEach(
              ([key, value]) => {
                sellrows.push(<TradeAdvertisementsRowContainer tradeAdvertisement={this.props.selltradeadvertisements.data[key]} tradeAdvertisementId={key} key={key} tradeType='sell-ether'/>)}
          )
        } catch (error) {
          console.log(error)
        }
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
