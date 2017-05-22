import React, { Component } from 'react'
import * as _ from 'lodash'
import BuyTradeAdvertisementRow from './BuyTradeAdvertisementRow'

class BuyTradeAdvertisementsList extends Component {
  render () {
    var buytradeadvertisements = this.props.buytradeadvertisements
    var usersInfo = this.props.usersInfo.usersInfo
    var uid = this.props.user.data.uid;
    var userData, buyer
    const rows = _.map(buytradeadvertisements, function (buyTradeAdvertisementData, key) {
      if(buyTradeAdvertisementData.buyerUid !== uid) {
        buyer = users[buyTradeAdvertisementData.buyerUid]
        userData = (usersInfo) ? usersInfo[buyTradeAdvertisementData.buyerUid] : null
        return <BuyTradeAdvertisementRow buyTradeAdvertisementData={buyTradeAdvertisementData} userData={userData} buyer={buyer} userId={key} key={key} />
      }
    })

    return (
      <div>
        {rows}
      </div>)
  }
}

export default BuyTradeAdvertisementsList
