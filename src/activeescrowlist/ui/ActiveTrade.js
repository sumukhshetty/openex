import React, { Component } from 'react'
//TODO import HelpContainer
import ViewActiveTradeButton from '../../activetrade/layouts/ViewActiveTradeButton'
import { browserHistory } from 'react-router'

class ActiveTrade extends Component {
  constructor(props){
    super(props)
    this.state ={
      activeTradeData:this.props.activeTradeData,
      orderId: this.props.orderId,
      orderKey: this.props.orderKey
    }
  }

  componentWillMount(){
    console.log(this.props.orderId)
    this.props.onBeforeComponentLoads(this.props.orderId);
  }
  render() {

    console.log('in render [ActiveTrade]' + this.props.orderId);
    console.log(this.props.activeTradeData.activeTradeData[this.props.orderKey]);
    if(this.props.activeTradeData.activeTradeData[this.props.orderKey]) {
      var tradeDetails = this.props.activeTradeData.activeTradeData[this.props.orderKey];
      var tradeType = (tradeDetails.tradeType === "buy-ether") ? 'Buy Order' : 'Sell Order'
      return(
          <tr>
            <td>1238</td>
            <td>{tradeDetails.lastUpated}</td>
            <td>{tradeType}</td>
            <td>David Washington</td>
            <td>{tradeDetails.amount}</td>
            <td>{tradeDetails.amount}</td>
            <td>{tradeDetails.status}</td>
            <td><i className='icon'>greendot</i> Active</td>
            <ViewActiveTradeButton orderId={this.props.orderId} />
          </tr>
      )
    } else {
      return (
        null
      )
    }
  }
}

export default ActiveTrade
