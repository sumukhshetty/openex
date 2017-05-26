import React, { Component } from 'react'
import * as _ from 'lodash'
import BuyTradeAdvertisementRow from './BuyTradeAdvertisementRow'

class BuyTradeAdvertisementsList extends Component {
  // TODO if the length of the rows is zero - show the you're the first screen
  render () {
    console.log("buytradeadvertisements.ui.BuyTradeAdvertisementsList.render")
    var buytradeadvertisements = this.props.buytradeadvertisements.data
    var uid = this.props.user.data.uid;
    var users = this.props.users
    console.log(users)
    var userData, buyer
    const rows = _.map(buytradeadvertisements, function (buyTradeAdvertisementData, key) {
      console.log(buyTradeAdvertisementData, key)
      if(buyTradeAdvertisementData.buyerUid !== uid) {
        console.log(buyTradeAdvertisementData.buyerUid)
        buyer = users.data[buyTradeAdvertisementData.buyerUid]
        console.log(buyer)
        //userData = (usersInfo) ? usersInfo[buyTradeAdvertisementData.buyerUid] : null
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
