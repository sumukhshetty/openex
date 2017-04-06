import React, { Component } from 'react'
import * as _ from 'lodash'
import UserBuyOrdersContainer from './UserBuyOrdersContainer'
import LoadMoreBuyOrders from './LoadMoreBuyOrders'

class BuyOrdersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      buyorders: this.props.buyorders
    }
  }


  render(){
    var buyorders = this.props.buyorders
    const rows = _.map(buyorders.buyorders,function(buyOrderData, key){
        return <UserBuyOrdersContainer buyOrderData={buyOrderData} userId={key} key={key}/>
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
