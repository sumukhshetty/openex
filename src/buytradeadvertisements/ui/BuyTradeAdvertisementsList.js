import React, { Component } from 'react'
import * as _ from 'lodash'
import BuyTradeAdvertisementRow from './BuyTradeAdvertisementRow'

class BuyTradeAdvertisementsList extends Component {
  // TODO if the length of the rows is zero - show the you're the first screen
  render () {
    var buytradeadvertisements = this.props.buytradeadvertisements.data
    var uid = this.props.user.data.uid;
    var users = this.props.users
    var buyer
    const rows = _.map(buytradeadvertisements, function (buyTradeAdvertisementData, key) {
      if(buyTradeAdvertisementData.buyerUid !== uid) {
        buyer = users.data[buyTradeAdvertisementData.buyerUid]
        return <BuyTradeAdvertisementRow buyTradeAdvertisementData={buyTradeAdvertisementData} buyTradeAdvertisementId={key} buyer={buyer} key={key} />
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
