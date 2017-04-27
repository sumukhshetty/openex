import React, { Component } from 'react'
import * as _ from 'lodash'
import SingleSellOrder from './SingleSellOrder'
import LoadMoreSellOrders from './LoadMoreSellOrders'

class SellOrdersList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      usersInfo: this.props.usersInfo,
      sellorders: this.props.sellorders
    }
  }

  render () {
    var sellorders = this.props.sellorders.sellorders
    var usersInfo = this.props.usersInfo.usersInfo
    var userData
    console.log('sellorders')
    console.log(sellorders)
    const rows = _.map(sellorders, function (sellOrderData, key) {
      userData = (usersInfo) ? usersInfo[sellOrderData.sellerUid] : null
      return <SingleSellOrder sellOrderData={sellOrderData} userData={userData} userId={key} key={key} />
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
