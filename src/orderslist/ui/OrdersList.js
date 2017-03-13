import React, { Component } from 'react'
import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import {ordersList} from './OrdersListActions.js'

class OrdersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      ordersList: this.props.ordersList
    }
  }

  componentWillMount(){
    console.log("in component will mount");
    console.log(this.state);
    console.log(this.props.ordersList);
    this.props.onBeforeComponentLoad(this.props.web3.web3);
    //this.setState({ordersList: ["0x1ece81090d05d0ec06ff7cde0a27da5f1547e49b", "0xfc7a9102a45b919c534f8665da4cb37568f03204", "0x029097acebdb861e4665af2f2648691fe3eef1c0", "0x1f1bcebaed369c235df34bf2480b184fdbcff0f4", "0x252745a62b431e37a258f0eeadcfcf02a27b458b", "0x30f4efcd6b785cdc56c63d71778a9ceb54b34c1d", "0xfa271fb00ec531a90c236082b10458d2b0988af7"]})

  }

  render() {
    console.log(this.props);
    console.log(typeof this.props.ordersList);
    var ordersList = (this.props.ordersList.ordersList) ? this.props.ordersList.ordersList : [];
    //var list = JSON.stringify(this.state.ordersList).split(',');
    //console.log(list);
    const orderList = ordersList.map( (val, index) => (
      <li class="orderItem" key={index}>
        Address:
        {val}
      </li>
    ));

    return(
      <div className="orderList">
        <ul>
          {orderList}
        </ul>
      </div>
    )
  }
}

export default OrdersList
