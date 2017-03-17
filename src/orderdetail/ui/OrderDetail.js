import React, { Component } from 'react'
import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import {orderDetail} from './OrderDetailActions.js'

class OrderDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      orderDetail: this.props.orderDetail,
      params: this.props.params
    }
  }

  componentWillMount(){
    console.log("in component will mount");
    this.props.onBeforeComponentLoad(this.props.web3.web3, this.props.params.address);
    //this.setState({ordersList: ["0x1ece81090d05d0ec06ff7cde0a27da5f1547e49b", "0xfc7a9102a45b919c534f8665da4cb37568f03204", "0x029097acebdb861e4665af2f2648691fe3eef1c0", "0x1f1bcebaed369c235df34bf2480b184fdbcff0f4", "0x252745a62b431e37a258f0eeadcfcf02a27b458b", "0x30f4efcd6b785cdc56c63d71778a9ceb54b34c1d", "0xfa271fb00ec531a90c236082b10458d2b0988af7"]})

  }

  render() {
    console.log(this.props);
    console.log(this.props.orderDetail);
    //console.log("address in params:" + this.props.params.address);
    console.log(this.props.params);
    //console.log(typeof this.props.orderDetail);
    var orderDetail = (this.props.orderDetail.orderDetail) ? this.props.orderDetail.orderDetail : [];
    //var list = JSON.stringify(this.state.ordersList).split(',');
    //console.log(list);
    if(orderDetail.length == 0) {
      return(
        <label>Loading...</label>
      )
    }
    else {
    return(
      <div className="orderDetails">
        <label>Address: {orderDetail[0]}</label>
        <br/>
        <label>Amount: {orderDetail[1]}</label>
      </div>
    )
  }
  }
}

export default OrderDetail
