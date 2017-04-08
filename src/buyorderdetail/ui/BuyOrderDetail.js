import React, { Component } from 'react'
import { browserHistory } from 'react-router'
//import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
//import {buyorder} from './OrderDetailActions.js'

class BuyOrderDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      buyOrderDetail: this.props.buyOrderDetail,
      params: this.props.params,
      uid: this.props.uid
    }
  }

  componentWillMount(){
    console.log("in component will mount");
    console.log(this.state);
    this.props.onBeforeComponentLoad(this.props.params.orderId);
    //this.setState({ordersList: ["0x1ece81090d05d0ec06ff7cde0a27da5f1547e49b", "0xfc7a9102a45b919c534f8665da4cb37568f03204", "0x029097acebdb861e4665af2f2648691fe3eef1c0", "0x1f1bcebaed369c235df34bf2480b184fdbcff0f4", "0x252745a62b431e37a258f0eeadcfcf02a27b458b", "0x30f4efcd6b785cdc56c63d71778a9ceb54b34c1d", "0xfa271fb00ec531a90c236082b10458d2b0988af7"]})
  }

  componentWillUnmount() {
    console.log('in component will unmount');
    this.props.clearBuyOrder();
  }

  // createContract(amount, buyerAddress, web3) {
  //   this.props.createBuyOrder(amount, buyerAddress, web3);
  // }

  render() {
    console.log(this.props);
    //console.log(this.props.buyorder);
    //console.log("address in params:" + this.props.params.address);
    console.log(this.props.params);
    //console.log(typeof this.props.buyorder);
    //var buyorder = (this.props.buyorder.buyorder) ? this.props.buyorder.buyorder : [];
    //var list = JSON.stringify(this.state.ordersList).split(',');
    //console.log(list);
    var buyOrder;
    if(this.props.buyOrderDetail.buyOrder) {
      buyOrder = this.props.buyOrderDetail.buyOrder;
      var rows = [];
      Object.entries(buyOrder).forEach(
        ([key, value]) => {
          if(typeof value != 'object') {
            rows.push(<div key={key}>{key} : {value}</div>)
          }
        }
      );
      return(
        <div>
        {/* <div>
          amount: {buyOrder.amount}
        </div>
        <div>
          Buyer Address: {buyOrder.buyerAddress}
        </div> */}
        {rows}
        <button onClick={()=>this.props.createBuyOrder(buyOrder.amount, buyOrder.buyerAddress, this.props.params.orderId, this.props.uid, this.props.web3.web3)}>Accept Order</button>
        <button onClick={()=>browserHistory.push('activebuyorder/'+this.props.params.orderId)}>View activebuyorder</button>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.params.orderId}
        </div>
      )
    }
  //   if(buyorder.length === 0) {
  //     return(
  //       <label>Loading...</label>
  //     )
  //   }
  //   else {
  //   return(
  //     <div className="buyorders">
  //       <label>Address: {buyorder[0]}</label>
  //       <br/>
  //       <label>Amount: {buyorder[1]}</label>
  //     </div>
  //   )
  // }
  }
}

export default BuyOrderDetail
