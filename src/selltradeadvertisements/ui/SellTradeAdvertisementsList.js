import React, { Component } from 'react'
import * as _ from 'lodash'
import SellTradeAdvertisementRow from './SellTradeAdvertisementRow'
import SellTradeAdvertisementsHeader from './../layouts/SellTradeAdvertisementsHeader'
//import LoadMoreSellOrders from './LoadMoreSellOrders'
import YouAreFirst from './../../generic-components/YouAreFirst'

class SellTradeAdvertisementsList extends Component {
  render(){
    console.log('SellTradeAdvertisementsList.render')
    var selltradeadvertisements = this.props.selltradeadvertisements.data
    var etherPrice = this.props.etherPrice.data;
    var users = this.props.users
    var uid = this.props.user.data.uid;
    var seller;

    var arr = _.map(selltradeadvertisements, function(value, prop){
      return {prop: prop, value: value}
    });
    var byMargin = arr.slice(0)
    byMargin.sort(function(a,b){
      return a.value.margin - b.value.margin
    })
    byMargin = Object.assign({},byMargin)

    const rows = _.map(byMargin, function(selltradeadvertisement, key){
      console.log(selltradeadvertisement)
      if (selltradeadvertisement.value.sellerUid !== uid) {
        console.log("i'm here")
        if (selltradeadvertisement.value.active){
          seller = users.data[selltradeadvertisement.value.sellerUid]
          var marginMultiplier = (1 + (parseInt(selltradeadvertisement.value.margin, 10) * 0.01))
          var price = etherPrice ? (etherPrice*marginMultiplier) : null;
          return <SellTradeAdvertisementRow price={price} sellTradeAdvertisementData={selltradeadvertisement.value} sellTradeAdvertisementId={selltradeadvertisement.prop} seller={seller} etherPrice={etherPrice} key={selltradeadvertisement.prop}/>        }
      }
    })
    if(rows[0] !== undefined){
      return (
        <table>
        {this.props.selltradeadvertisements.data && <SellTradeAdvertisementsHeader />}
        <tbody>
          {rows}
        </tbody>
        </table>
        )
    } else {
      return (<YouAreFirst />)
    }
  }
}

export default SellTradeAdvertisementsList
