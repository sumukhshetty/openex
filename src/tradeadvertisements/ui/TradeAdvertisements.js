import React, { Component } from 'react'
//import {raven} from './../../index.js'
import TradeAdvertisementsRowContainer from './TradeAdvertisementsRowContainer'
import TradeAdvertisementsEmptyState from './../layouts/TradeAdvertisementsEmptyState'
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
          //raven.captureException(error)
        }
        try{
          Object.entries(tradeadvertisements.sellether).forEach(
              ([key, value]) => {
                sellrows.push(<TradeAdvertisementsRowContainer tradeAdvertisement={this.props.selltradeadvertisements.data[key]} tradeAdvertisementId={key} key={key} tradeType='sell-ether'/>)}
          )
        } catch (error) {
          //raven.captureException(error)
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
