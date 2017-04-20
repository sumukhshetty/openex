import React, { Component } from 'react'
//TODO import HelpContainer
import ViewActiveTradeButton from '../../activetrade/layouts/ViewActiveTradeButton'
import { browserHistory } from 'react-router'

class ActiveTrade extends Component {
  constructor(props){
    super(props)
    this.state ={
      user: this.props.user,
      activeTradeData:this.props.activeTradeData,
      orderId: this.props.orderId,
      tradeType: this.props.tradeType
    }
  }

  componentWillMount(){
    console.log(this.props.orderId)
    this.props.onBeforeComponentLoads(this.props.orderId, this.props.tradeType);
  }
  render() {

    console.log('in render [ActiveTrade]' + this.props.orderId);
    console.log(this.props.activeTradeData.activeTradeData);
    if(this.props.activeTradeData.activeTradeData[this.props.orderId]) {
      var tradeDetails = this.props.activeTradeData.activeTradeData[this.props.orderId];
      var tradeType = (this.props.tradeType === "buy-ether") ? 'Buy Order' : 'Sell Order'
      var username;
      if(tradeDetails.buyerUid === this.props.user.data.uid) {
        username = tradeDetails.sellerUsername
      } else {
        username = tradeDetails.buyerUsername
      }
      return(
            <tr>
              <td className='fb5 tc'>1238</td>
              <td className='fb15 tc'>{tradeDetails.lastUpated}</td>
              <td className='fb10 tc'>{tradeType}</td>
              <td className='fb15 tc'>{username}</td>
              <td className='fb10 tc'>{tradeDetails.amount}</td>
              <td className='fb10 tc'>{tradeDetails.amount}</td>
              <td className='fb10 tc'>{tradeDetails.status}</td>
              <td className='fb10 tc'><i className='icon'>greendot</i> Active</td>
              <ViewActiveTradeButton orderId={this.props.orderId} tradeType={tradeDetails.tradeType} />
            </tr>
        )
      // if(this.props.tradeType === 'buy-ether') {
      //   return(
      //       <tr>
      //         <td>1238</td>
      //         <td>{tradeDetails.lastUpated}</td>
      //         <td>{tradeType}</td>
      //         <td>{username}</td>
      //         <td>{tradeDetails.amount}</td>
      //         <td>{tradeDetails.amount}</td>
      //         <td>{tradeDetails.status}</td>
      //         <td><i className='icon'>greendot</i> Active</td>
      //         <ViewActiveTradeButton orderId={this.props.orderId} tradeType={tradeDetails.tradeType} />
      //       </tr>
      //   )
      // } else if (this.props.tradeType === 'sell-ether') {
      //   return(
      //       <tr>
      //         <td>1238</td>
      //         <td>{tradeDetails.lastUpated}</td>
      //         <td>{tradeType}</td>
      //         <td>{username}</td>
      //         <td>{tradeDetails.amount}</td>
      //         <td>{tradeDetails.amount}</td>
      //         <td>{tradeDetails.status}</td>
      //         <td><i className='icon'>greendot</i> Active</td>
      //         <ViewActiveTradeButton orderId={this.props.orderId} tradeType={tradeDetails.tradeType} />
      //       </tr>
      //   )
      // }
    } else {
      return (
        null
      )
    }
  }
}

export default ActiveTrade
