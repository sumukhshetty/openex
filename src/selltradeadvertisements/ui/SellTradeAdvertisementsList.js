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
    var component = this
    const rows = _.map(byMargin, function(selltradeadvertisement, key){
      if (selltradeadvertisement.value.sellerUid !== uid) {
        if (users.data[selltradeadvertisement.value.sellerUid].active){
          if (selltradeadvertisement.value.active){
            seller = users.data[selltradeadvertisement.value.sellerUid]
            var marginMultiplier = (1 + (parseFloat(selltradeadvertisement.value.margin) * 0.01))
            var price = etherPrice ? (etherPrice*marginMultiplier) : null;
            var _presence
            if (component.props.presence.data){
              _presence = component.props.presence.data[selltradeadvertisement.value.sellerUid]
            }
            return (<SellTradeAdvertisementRow
              price={price}
              sellTradeAdvertisementData={selltradeadvertisement.value}
              sellTradeAdvertisementId={selltradeadvertisement.prop}
              seller={seller} etherPrice={etherPrice}
              key={selltradeadvertisement.prop}
              presence={_presence}/>)
          } else {
            return null
          }
        } else {
          return null
        }
      } else {
        return null
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
