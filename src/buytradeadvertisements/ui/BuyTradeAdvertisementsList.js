import React, { Component } from 'react'
import * as _ from 'lodash'
import BuyTradeAdvertisementRow from './BuyTradeAdvertisementRow'

class BuyTradeAdvertisementsList extends Component {
  // TODO if the length of the rows is zero - show the you're the first screen
  render () {
    var buytradeadvertisements = this.props.buytradeadvertisements.data
    var etherPrice = this.props.etherPrice.data;
    var uid = this.props.user.data.uid;
    var users = this.props.users
    var buyer
    const rows = _.map(buytradeadvertisements, function (buyTradeAdvertisementData, key) {
      if(buyTradeAdvertisementData.buyerUid !== uid) {
        buyer = users.data[buyTradeAdvertisementData.buyerUid]
        var marginMultiplier = (1 + (parseInt(buyTradeAdvertisementData.margin, 10) * 0.01))
        var price = etherPrice ? (etherPrice*marginMultiplier) : null;
        return <BuyTradeAdvertisementRow buyTradeAdvertisementData={buyTradeAdvertisementData} buyTradeAdvertisementId={key} price={price.toFixed(2)} buyer={buyer} key={key} />
      } else {
        console.log("buyer is looking at himself")
      }
    })

    return (
      <div>
        {rows}
      </div>)
  }
}

export default BuyTradeAdvertisementsList
