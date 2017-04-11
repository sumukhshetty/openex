import React, { Component } from 'react'
import * as _ from 'lodash'
import UserSellOrdersContainer from './UserSellOrdersContainer'
import LoadMoreSellOrders from './LoadMoreSellOrders'

class SellOrdersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      sellorders: this.props.sellorders
    }
  }


  render(){
    var sellorders = this.props.sellorders
    console.log('sellorders');
    console.log(sellorders);
    const rows = _.map(sellorders,function(sellOrderData, key){
        return <UserSellOrdersContainer sellOrderData={sellOrderData} userId={key} key={key}/>
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
