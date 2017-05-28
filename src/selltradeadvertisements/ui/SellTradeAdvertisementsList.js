import React, { Component } from 'react'
import * as _ from 'lodash'
import SellTradeAdvertisementRow from './SellTradeAdvertisementRow'
//import LoadMoreSellOrders from './LoadMoreSellOrders'

class SellTradeAdvertisementsList extends Component {
  render(){
    var selltradeadvertisements = this.props.selltradeadvertisements.data
    var etherPrice = this.props.etherPrice.data;
    var currency = this.props.user.currency;
    var users = this.props.users
    var uid = this.props.user.data.uid;
    var seller;
    const rows = _.map(selltradeadvertisements,function(sellTradeAdvertisement, key) {
        if(sellTradeAdvertisement.sellerUid !== uid) {
          seller = users.data[sellTradeAdvertisement.sellerUid]
          etherPrice = etherPrice ? etherPrice : null;
          return <SellTradeAdvertisementRow sellTradeAdvertisementData={sellTradeAdvertisement} sellTradeAdvertisementId={key} seller={seller} etherPrice={etherPrice} currency={currency} userId={key} key={key}/>
        } else {
          console.log("seller is looking at themself")
        }

    })

    return (
      <div>
        {rows}
      </div>)
  }
}

export default SellTradeAdvertisementsList
