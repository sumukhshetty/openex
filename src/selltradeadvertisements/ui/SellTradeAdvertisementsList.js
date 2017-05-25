import React, { Component } from 'react'
import * as _ from 'lodash'
import SellTradeAdvertisementRow from './SellTradeAdvertisementRow'
//import LoadMoreSellOrders from './LoadMoreSellOrders'

class SellTradeAdvertisementsList extends Component {
  render(){
    console.log("ui.SellTradeAdvertisementsList")
    var selltradeadvertisements = this.props.selltradeadvertisements
    var usersInfo = this.props.usersInfo.usersInfo;
    var etherPrice = this.props.etherPrice.data;
    var currency = this.props.user.currency;
    var uid = this.props.user.data.uid;
    var userData, seller;
    const rows = _.map(selltradeadvertisements,function(sellTradeAdvertisement, key) {
        console.log(sellTradeAdvertisement)
        console.log(key)
        if(sellTradeAdvertisement.sellerUid !== uid) {
          seller = this.props.users[sellTradeAdvertisement.sellerUid]
          userData = usersInfo ? usersInfo[sellTradeAdvertisement.sellerUid] : null;
          etherPrice = etherPrice ? etherPrice : null;
          return <SellTradeAdvertisementRow sellTradeAdvertisementData={sellTradeAdvertisement} seller={seller} etherPrice={etherPrice} currency={currency} userData={userData} userId={key} key={key}/>
        }
    })

    return (
      <div>
        {rows}
      </div>)
  }
}

export default SellTradeAdvertisementsList
