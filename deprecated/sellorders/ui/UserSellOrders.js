import React, { Component } from 'react'
import * as _ from 'lodash'
import SingleSellOrder from './SingleSellOrder'

class UserSellOrders extends Component {

  render(){
    const rows = _.map(this.props.sellOrderData,function(sellOrderData, key){
      return <SingleSellOrder sellOrderData={sellOrderData} orderId={key} key={key}/>
    })
    return (
      <div>
        {rows}
      </div>)
  }
}

export default UserSellOrders