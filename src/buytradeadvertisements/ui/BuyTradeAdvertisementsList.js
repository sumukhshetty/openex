import React, { Component } from 'react'
import * as _ from 'lodash'
import BuyTradeAdvertisementRow from './BuyTradeAdvertisementRow'

class BuyTradeAdvertisementsList extends Component {
  // TODO if the length of the rows is zero - show the you're the first screen
  render () {
    console.log("buytradeadvertisements.ui.BuyTradeAdvertisementsList.render")
    var buytradeadvertisements = this.props.buytradeadvertisements
    var uid = this.props.user.data.uid;
    var userData, buyer
    const rows = _.map(buytradeadvertisements, function (buyTradeAdvertisementData, key) {
      console.log(buyTradeAdvertisementData, key)
      if(buyTradeAdvertisementData.buyerUid !== uid) {
        buyer = this.props.users[buyTradeAdvertisementData.buyerUid]
        //userData = (usersInfo) ? usersInfo[buyTradeAdvertisementData.buyerUid] : null
        return <BuyTradeAdvertisementRow buyTradeAdvertisementData={buyTradeAdvertisementData} buyTradeAdvertisementId={key} userData={userData} buyer={buyer} userId={key} key={key} />
      }
    })

    return (
      <div>
        {rows}
      </div>)
  }
}

export default BuyTradeAdvertisementsList
