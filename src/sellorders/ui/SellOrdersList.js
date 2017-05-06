import React, { Component } from 'react'
import * as _ from 'lodash'
import SingleSellOrder from './SingleSellOrder'
import LoadMoreSellOrders from './LoadMoreSellOrders'

class SellOrdersList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      etherPrices: this.props.etherPrices,
      user: this.props.user,
      usersInfo: this.props.usersInfo,
      sellorders: this.props.sellorders
    }
  }

  render(){
    var sellorders = this.props.sellorders.sellorders;
    var usersInfo = this.props.usersInfo.usersInfo;
    var etherPrices = this.props.etherPrices.etherPrices;
    var uid = this.props.user.data.uid;
    var userData, etherPrice;
    console.log('sellorders');
    console.log(sellorders);
    const rows = _.map(sellorders,function(sellOrderData, key) {
        if(sellOrderData.sellerUid !== uid) {
          userData = usersInfo ? usersInfo[sellOrderData.sellerUid] : null;
          etherPrice = etherPrices ? etherPrices["INR"] : null;
          return <SingleSellOrder sellOrderData={sellOrderData} etherPrice={etherPrice} userData={userData} userId={key} key={key}/>
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
