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
      orderKey: this.props.orderKey,
      tradeType: this.props.tradeType
    }
  }

  componentWillMount(){
    console.log(this.props.orderId)
    this.props.onBeforeComponentLoads(this.props.orderId, this.props.tradeType);
  }
  render() {

    console.log('in render [ActiveTrade]' + this.props.orderId);
    console.log(this.props.activeTradeData.activeTradeData[this.props.orderKey]);
    if(this.props.activeTradeData.activeTradeData[this.props.orderKey]) {
      var tradeDetails = this.props.activeTradeData.activeTradeData[this.props.orderKey];
      var tradeType = (this.props.tradeType === "buy-ether") ? 'Buy Order' : 'Sell Order'
      if(tradeDetails.tradeType === 'buy-ether') {
        return(
            <tr>
              <td>1238</td>
              <td>{tradeDetails.lastUpated}</td>
              <td>{tradeType}</td>
              <td>{tradeDetails.buyerUsername}</td>
              <td>{tradeDetails.amount}</td>
              <td>{tradeDetails.amount}</td>
              <td>{tradeDetails.status}</td>
              <td><i className='icon'>greendot</i> Active</td>
              <ViewActiveTradeButton orderId={this.props.orderId} tradeType={tradeDetails.tradeType} />
            </tr>
        )
      } else if (tradeDetails.tradeType === 'sell-ether') {
        var rows = [];
        Object.entries(tradeDetails.requests).forEach(
            ([key, value]) => {
              rows.push(
                <tr>
                  <td>1238</td>
                  <td>{tradeDetails.lastUpated}</td>
                  <td>{tradeType}</td>
                  <td>{tradeDetails.sellerUsername}</td>
                  <td>{value.amount}</td>
                  <td>{value.amount}</td>
                  <td>{value.status}</td>
                  <td><i className='icon'>greendot</i> Active</td>
                  <ViewActiveTradeButton orderId={this.props.orderId} tradeType={tradeDetails.tradeType} requestId={key}/>
                </tr>
              )
            }
        );
        return <span>{rows}</span>;
      }
    } else {
      return (
        null
      )
    }
  }
}

export default ActiveTrade
