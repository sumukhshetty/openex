import React, { Component } from 'react'
import * as _ from 'lodash'
import BuyTradeAdvertisementRow from './BuyTradeAdvertisementRow'
import BuyTradeAdvertisementsHeader from '../layouts/BuyTradeAdvertisementsHeader'
import YouAreFirst from './../../generic-components/YouAreFirst'

class BuyTradeAdvertisementsList extends Component {
  render () {
    var buytradeadvertisements = this.props.buytradeadvertisements.data
    var etherPrice = this.props.etherPrice.data;
    var uid = this.props.user.data.uid;
    var users = this.props.users
    var buyer
    var arr = _.map(buytradeadvertisements, function(value, prop){
      return {prop: prop, value: value}
    });

    var byMargin = arr.slice(0)
    byMargin.sort(function(a,b){
      return a.value.margin - b.value.margin
    })

    byMargin = Object.assign({},byMargin)
    const rows = _.map(byMargin, function(buytradeadvertisement, key){
      if (buytradeadvertisement.value.buyerUid !== uid){
        if (buytradeadvertisement.value.active){
          buyer = users.data[buytradeadvertisement.value.buyerUid]
          var marginMultiplier = (1 + (parseInt(buytradeadvertisement.value.margin, 10) * 0.01))
          var price = etherPrice ? (etherPrice*marginMultiplier) : null;
          return <BuyTradeAdvertisementRow buyTradeAdvertisementData={buytradeadvertisement.value} buyTradeAdvertisementId={buytradeadvertisement.prop} price={price.toFixed(2)} buyer={buyer} key={buytradeadvertisement.prop} />
        } else {
          return null
        }
      } else {
        return null 
      }
    })

    if(rows[0] !== undefined) {

        return (
          <table>
          {this.props.buytradeadvertisements.data && <BuyTradeAdvertisementsHeader />}
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

export default BuyTradeAdvertisementsList
