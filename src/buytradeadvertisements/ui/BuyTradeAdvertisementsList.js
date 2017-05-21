import React, { Component } from 'react'
import * as _ from 'lodash'
import LoadMoreBuyTradeAdvertisements from './LoadMoreBuyTradeAdvertisements'
import SingleBuyTradeAdvertisement from './SingleBuyTradeAdvertisement'

class BuyTradeAdvertisementsList extends Component {
  render () {
    var buytradeadvertisements = this.props.buytradeadvertisements
    var usersInfo = this.props.usersInfo.usersInfo
    var uid = this.props.user.data.uid;
    var userData
    // console.log('buyorders');
    // console.log(buyorders);
    const rows = _.map(buytradeadvertisements, function (buyTradeAdvertisementData, key) {
      if(buyTradeAdvertisementData.buyerUid !== uid) {
        userData = (usersInfo) ? usersInfo[buyTradeAdvertisementData.buyerUid] : null
        return <SingleBuyTradeAdvertisement buyTradeAdvertisementData={buyTradeAdvertisementData} userData={userData} userId={key} key={key} />
      }
    })

    return (
      <div>
        {rows}
        <div>
          <LoadMoreBuyTradeAdvertisements />
        </div>
      </div>)
  }
}

export default BuyTradeAdvertisementsList
