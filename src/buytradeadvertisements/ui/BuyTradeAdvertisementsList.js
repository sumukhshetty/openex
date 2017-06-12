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
    const rows = _.map(buytradeadvertisements, function (buyTradeAdvertisementData, key) {
      if(buyTradeAdvertisementData.buyerUid !== uid) {
        if(buyTradeAdvertisementData.active) {
          var marginMultiplier = (1 + (parseInt(buyTradeAdvertisementData.margin, 10) * 0.01))
          var price = etherPrice ? (etherPrice*marginMultiplier) : null;
          return <BuyTradeAdvertisementRow buyTradeAdvertisementData={buyTradeAdvertisementData} buyTradeAdvertisementId={key} price={price.toFixed(2)} buyer={buyer} key={key} />
        }
      } 
    })
    if(rows.length >1) {
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
