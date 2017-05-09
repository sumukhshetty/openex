import React, { Component } from 'react'
import * as _ from 'lodash'
import SingleSellOrder from './SingleSellOrder'
import LoadMoreSellOrders from './LoadMoreSellOrders'

class SellOrdersList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      etherPrice: this.props.etherPrice,
      user: this.props.user,
      usersInfo: this.props.usersInfo,
      sellorders: this.props.sellorders
    }
  }

  render(){
    var sellorders = this.props.sellorders.sellorders;
    var usersInfo = this.props.usersInfo.usersInfo;
    var etherPrice = this.props.etherPrice.etherPrice;
    var currency = this.props.user.currency;
    var uid = this.props.user.data.uid;
    var userData, etherPrice;
    console.log('sellorders');
    console.log(sellorders);
    const rows = _.map(sellorders,function(sellOrderData, key) {
        if(sellOrderData.sellerUid !== uid) {
          userData = usersInfo ? usersInfo[sellOrderData.sellerUid] : null;
          etherPrice = etherPrice ? etherPrice : null;
          return <SingleSellOrder sellOrderData={sellOrderData} etherPrice={etherPrice} currency={currency} userData={userData} userId={key} key={key}/>
        }
    })

    return (
      <div>
        {rows}
        <div>
          <LoadMoreSellOrders />
        </div>
      </div>)
  }
}

export default SellOrdersList
