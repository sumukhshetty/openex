import React, { Component } from 'react'

class OrdersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      ordersList: this.props.ordersList
    }
  }

  componentWillMount(){
    this.props.onBeforeComponentLoad(this.props.web3.web3);
    //this.setState({ordersList: ["0x1ece81090d05d0ec06ff7cde0a27da5f1547e49b", "0xfc7a9102a45b919c534f8665da4cb37568f03204", "0x029097acebdb861e4665af2f2648691fe3eef1c0", "0x1f1bcebaed369c235df34bf2480b184fdbcff0f4", "0x252745a62b431e37a258f0eeadcfcf02a27b458b", "0x30f4efcd6b785cdc56c63d71778a9ceb54b34c1d", "0xfa271fb00ec531a90c236082b10458d2b0988af7"]})

  }

  render() {
    var ordersList = this.props.ordersList.ordersList;
    var buyOrdersList = [];
    var sellOrdersList = [];
    //var list = JSON.stringify(this.state.ordersList).split(',');
    //console.log(list);


    if(ordersList) {
      for(var i = 0; i < ordersList.length; i++) {
        console.log("orderslist[" + i + "]");
        console.log(ordersList[i]);
        console.log(ordersList[i][1]);
        if(ordersList[i][1] === "sell") {
          sellOrdersList.push(ordersList[i]);
        } else {
          buyOrdersList.push(ordersList[i]);
        }
      }
      console.log('selllist: ');
      console.log(sellOrdersList);
      console.log('buylist: ');
      console.log(buyOrdersList);
      const buyOrderList = buyOrdersList.map( (val, index) => (
        <tr className="orderItem" key={index}>
          <td>
            {val[0]}
          </td>
          <td>
            {val[1]}
          </td>
        </tr>
      ));
      const sellOrderList = sellOrdersList.map( (val, index) => (
        <tr className="orderItem" key={index}>
          <td>
            {val[0]}
          </td>
          <td>
            {val[1]}
          </td>
        </tr>
      ));
      return(
        <div>
        <table className="buyOrderList">
          <th>
            <tr>
              <td>Address</td>
            </tr>
          </th>
          <tbody>
            {buyOrderList}
          </tbody>
        </table>

        <table className="sellOrderList">
          <th>
            <tr>
              <td>Address</td>
            </tr>
          </th>
          <tbody>
            {sellOrderList}
          </tbody>
        </table>
        </div>
      )
    } else {
      return(
        //TODO: sick animation
        <label>Loading...</label>
      )
    }


  }
}

export default OrdersList
