import React, { Component } from 'react'
import * as _ from 'lodash'
import UserBuyOrdersContainer from './UserBuyOrdersContainer'
import LoadMoreBuyOrders from './LoadMoreBuyOrders'
import SingleBuyOrder from './SingleBuyOrder'

class BuyOrdersList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      usersInfo: this.props.usersInfo,
      buyorders: this.props.buyorders
    }
  }

  render () {
    var buyorders = this.props.buyorders.buyorders
    var usersInfo = this.props.usersInfo.usersInfo
    var uid = this.props.user.data.uid
    var userData
    // console.log('buyorders');
    // console.log(buyorders);
    const rows = _.map(buyorders, function (buyOrderData, key) {
      if (buyOrderData.buyerUid !== uid) {
        userData = (usersInfo) ? usersInfo[buyOrderData.buyerUid] : null
        return <SingleBuyOrder buyOrderData={buyOrderData} userData={userData} userId={key} key={key} />
      }
    })

    return (
      <div>
        {rows}
        <div>
          <LoadMoreBuyOrders />
        </div>
      </div>)
  }
}

export default BuyOrdersList
