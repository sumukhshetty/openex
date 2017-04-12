import React, { Component } from 'react'
import { browserHistory } from 'react-router'
//import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
//import {sellorder} from './OrderDetailActions.js'

class SellOrderDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      sellOrderDetail: this.props.sellOrderDetail,
      params: this.props.params,
      uid: this.props.uid,
      requestAmount: 0
    }
  }

  componentWillMount(){
    console.log("in component will mount");
    console.log(this.state);
    this.props.onBeforeComponentLoad(this.props.params.orderId, this.props.web3.web3);
    //this.setState({ordersList: ["0x1ece81090d05d0ec06ff7cde0a27da5f1547e49b", "0xfc7a9102a45b919c534f8665da4cb37568f03204", "0x029097acebdb861e4665af2f2648691fe3eef1c0", "0x1f1bcebaed369c235df34bf2480b184fdbcff0f4", "0x252745a62b431e37a258f0eeadcfcf02a27b458b", "0x30f4efcd6b785cdc56c63d71778a9ceb54b34c1d", "0xfa271fb00ec531a90c236082b10458d2b0988af7"]})
  }

  componentWillUnmount() {
    console.log('in component will unmount');
    this.props.clearSellOrder();
  }

  // createContract(amount, sellerAddress, web3) {
  //   this.props.createSellOrder(amount, sellerAddress, web3);
  // }
  handleRequestAmountChange(event) {
    this.setState({requestAmount: event.target.value});
  }

  render() {
    console.log(this.props);
    //console.log(this.props.sellorder);
    //console.log("address in params:" + this.props.params.address);
    console.log(this.props.params);
    //console.log(typeof this.props.sellorder);
    //var sellorder = (this.props.sellorder.sellorder) ? this.props.sellorder.sellorder : [];
    //var list = JSON.stringify(this.state.ordersList).split(',');
    //console.log(list);
    var sellOrder;
    if(this.props.sellOrderDetail.sellOrder) {
      sellOrder = this.props.sellOrderDetail.sellOrder;
      var rows = [];
      Object.entries(sellOrder).forEach(
        ([key, value]) => {
          if(typeof value != 'object') {
            rows.push(<div key={key}>{key} : {value}</div>)
          }
        }
      );
      var availableFunds;
      if(this.props.sellOrderDetail.contractInfo) {
        availableFunds = <div>Available funds: {this.props.sellOrderDetail.contractInfo.availableFunds.toNumber()}</div>
      }
      return(
        <div>
        {/* <div>
          amount: {sellOrder.amount}
        </div>
        <div>
          Seller Address: {sellOrder.sellerAddress}
        </div> */}
        {rows}
        <button onClick={()=>this.props.createSellOrder(sellOrder.amount, sellOrder.sellerAddress, this.props.params.orderId, this.props.uid, sellOrder.sellerUid, this.props.web3.web3)}>Accept Order</button>
        <button onClick={()=>browserHistory.push('activesellorder/'+this.props.params.orderId)}>View activesellorder</button>
        {availableFunds}
        <label>Request Ether</label>
        <input id='amount' type='number' value={this.state.requestAmount} onChange={this.handleRequestAmountChange.bind(this)}/>
        <button onClick={()=>this.props.requestEther(this.state.requestAmount, this.props.uid, this.props.params.orderId)}>Request</button>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.params.orderId}
        </div>
      )
    }
  //   if(sellorder.length === 0) {
  //     return(
  //       <label>Loading...</label>
  //     )
  //   }
  //   else {
  //   return(
  //     <div className="sellorders">
  //       <label>Address: {sellorder[0]}</label>
  //       <br/>
  //       <label>Amount: {sellorder[1]}</label>
  //     </div>
  //   )
  // }
  }
}

export default SellOrderDetail
