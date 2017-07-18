import React, { Component } from 'react';
import * as _ from 'lodash'
import BrowseAdvertisementRow from './BrowseAdvertisementRow'

export default class BrowseAdvertisements extends Component {

  componentWillMount() {
    console.log('BrowseAdvertisements.componentWillMount')
    console.log(this.props)
  }

  
  render () {
    console.log('BrowseAdvertisements.render')
    console.log(this.props)
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

    const buyrows = _.map(buyTradeAdvertisementsByMargin,function(buytradeadvertisement, key){
      console.log('mapping through buytradeadvertisements')
      console.log(buytradeadvertisement)
      var buyer = users.data[buytradeadvertisement.value.buyerUid]
      var marginMultiplier = (1 + (parseInt(buytradeadvertisement.value.margin, 10) * 0.01))
      var price = etherPrice ? (etherPrice*marginMultiplier) : null;
      return (<BrowseAdvertisementRow tradeAdvertisementData={buytradeadvertisement.value} 
        tradeAdvertisementId={buytradeadvertisement.prop} 
        price={price.toFixed(2)} 
        user={buyer} 
        key={buytradeadvertisement.prop} />)
    })

    const sellrows = _.map(sellTradeAdvertisementsByMargin, function(selltradeadvertisement, key){
      console.log('mapping through selltradeadvertisements')
      console.log(selltradeadvertisement)
      var seller = users.data[selltradeadvertisement.value.sellerUid]
      var marginMultiplier = (1 + (parseInt(selltradeadvertisement.value.margin, 10) * 0.01))
      var price = etherPrice ? (etherPrice*marginMultiplier) : null;
      return (<BrowseAdvertisementRow tradeAdvertisementData={selltradeadvertisement.value}
        tradeAdvertisementId={selltradeadvertisement.prop} 
        price={price.toFixed(2)} 
        user={seller} 
        key={selltradeadvertisement.prop} />)
    })
    return(<div>
      <div>
      BrowseAdvertisements
      </div>
      <div>
      Sell Trade Advertisements
      </div>
      <div>
      Buy Trade Advertisements
      </div>
      </div>)
  }
}
