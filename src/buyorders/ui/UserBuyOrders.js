import React, { Component } from 'react'
import * as _ from 'lodash'
import SingleBuyOrder from './SingleBuyOrder'

class UserBuyOrders extends Component {

  render(){
    const rows = _.map(this.props.buyOrderData,function(buyOrderData, key){
      return <SingleBuyOrder buyOrderData={buyOrderData} orderId={key} key={key}/>
    })
    return (
      <div>
        {this.props.userId}
        {rows}
      </div>)
  }
}

export default UserBuyOrders