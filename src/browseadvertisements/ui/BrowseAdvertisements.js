import React, { Component } from 'react';
import * as _ from 'lodash'
import BrowseBuyAdvertisementRow from './BrowseBuyAdvertisementRow'
import BrowseSellAdvertisementRow from './BrowseSellAdvertisementRow'
import BuyTradeAdvertisementsHeader from '../layouts/BuyTradeAdvertisementsHeader'


export default class BrowseAdvertisements extends Component {
  
  render () {
    var users = this.props.users
    var etherPrice = this.props.etherPrice.data;
    var buytradeadvertisements = this.props.buytradeadvertisements.data
    var selltradeadvertisements = this.props.selltradeadvertisements.data

    var buyTradeAdvertisementsArray = _.map(buytradeadvertisements, function(value, prop){
      return {prop: prop, value: value}
    });

    var sellTradeAdvertisementsArray = _.map(selltradeadvertisements, function(value, prop){
      return {prop: prop, value: value}
    });

    var buyTradeAdvertisementsByMargin = buyTradeAdvertisementsArray.slice(0)
    buyTradeAdvertisementsByMargin.sort(function(a,b){
      return a.value.margin - b.value.margin
    })

    var sellTradeAdvertisementsByMargin = sellTradeAdvertisementsArray.slice(0)
    sellTradeAdvertisementsByMargin.sort(function(a,b){
      return a.value.margin - b.value.margin
    })

    var component = this
    const buyrows = _.map(buyTradeAdvertisementsByMargin.slice(0,4),function(buytradeadvertisement, key){
      var buyer = users.data[buytradeadvertisement.value.buyerUid]
      var marginMultiplier = (1 + (parseInt(buytradeadvertisement.value.margin, 10) * 0.01))
      var price = etherPrice ? (etherPrice*marginMultiplier) : null;
      console.log(price)
      var _presence
      if (component.props.presence.data){
        _presence = component.props.presence.data[buytradeadvertisement.value.buyerUid]
      }
      return (<BrowseBuyAdvertisementRow buyTradeAdvertisementData={buytradeadvertisement.value} 
        buyTradeAdvertisementId={buytradeadvertisement.prop} 
        price={price.toFixed(2)} 
        buyer={buyer} 
        key={buytradeadvertisement.prop} 
        presence={_presence}
        />)
    })
    var buytable
    if(buyrows[0]!==undefined){
      buytable =         (<table>
              <BuyTradeAdvertisementsHeader />
              <tbody>
                {buyrows}
              </tbody>
              </table>)
    }

    const sellrows = _.map(sellTradeAdvertisementsByMargin.slice(0,4), function(selltradeadvertisement, key){
      var seller = users.data[selltradeadvertisement.value.sellerUid]
      var marginMultiplier = (1 + (parseInt(selltradeadvertisement.value.margin, 10) * 0.01))
      var price = etherPrice ? (etherPrice*marginMultiplier) : null;
      console.log(price)
      var _presence
      if(component.props.presence.data) {
        _presence = component.props.presence.data[selltradeadvertisement.value.sellerUid]
      }
      return (<BrowseSellAdvertisementRow sellTradeAdvertisementData={selltradeadvertisement.value}
        sellTradeAdvertisementId={selltradeadvertisement.prop} 
        price={price.toFixed(2)} 
        seller={seller} 
        key={selltradeadvertisement.prop} 
        presence={_presence}
        />)
    })
    var selltable 
    if(sellrows[0]!==undefined){
      selltable = (<table>
              <BuyTradeAdvertisementsHeader />
              <tbody>
                {sellrows}
              </tbody>
              </table>)
    }
    return(<div>
      <div>
      Users Selling Ether
      </div>
      <div>
      {selltable ? selltable : null}
      </div>
      <div>
      Users Buying Ether
      </div>
      <div>
      {buytable ? buytable : null}
      </div>
      </div>)
  }
}
