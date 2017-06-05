import React, { Component } from 'react'

import TradeAdvertisementsRowContainer from './TradeAdvertisementsRowContainer'
import TradeAdvertisementsEmptyState from './../layouts/TradeAdvertisementsEmptyState'
//import ActiveAdContainer from './ActiveAdContainer'
//import AdListEmptyState from './AdListEmptyState'
import TradeAdvertisementsHeader from './../layouts/TradeAdvertisementsHeader';
class TradeAdvertisements extends Component {

    render() {
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
          //console.log(error)
        }
        try{
          Object.entries(tradeadvertisements.sellether).forEach(
              ([key, value]) => {
                sellrows.push(<TradeAdvertisementsRowContainer tradeAdvertisement={this.props.selltradeadvertisements.data[key]} tradeAdvertisementId={key} key={key} tradeType='sell-ether'/>)}
          )
        } catch (error) {
          //console.log(error)
        }
        return(
          <div>
          <table>
          <TradeAdvertisementsHeader/>
          <tbody>
          {buyrows}
          {sellrows}
          </tbody>
          </table>
          </div>
        )
      } else {
        return(
          <div>
            <TradeAdvertisementsEmptyState/>
          </div>
        )
      }
  }
}

export default TradeAdvertisements
