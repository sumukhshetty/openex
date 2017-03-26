import React, { Component } from 'react'
import * as _ from 'lodash'
import SingleSellOrder from './SingleSellOrder'
import LoadMoreSellOrders from './LoadMoreSellOrders'

class SellOrdersList extends Component {
/*  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
    }
  }*/


  render(){
/*    var buyorders = this.props.buyorders
    const rows = _.map(buyorders.buyorders,function(buyOrderData, key){
        return <UserBuyOrdersContainer buyOrderData={buyOrderData} userId={key} key={key}/>
    })*/

    return (

      <div>
      <SingleSellOrder/>
      <LoadMoreSellOrders />
      </div>)
  }
}

export default SellOrdersList