import React, { Component } from 'react';
import { browserHistory } from 'react-router'

// TODO import HelpContainer

//TODO
//SellButton takes buyer to a an order detail form a la https://automte.slack.com/files/shrek420mafia/F4U5X6HM1/orderdetails.png


class SellButton extends Component {

  render () {
    return (
      <td className='fb5'>
        <button onClick={()=>browserHistory.push('buyorderdetail/'+this.props.orderId)}> Sell </button>
      </td>
    );
  }
}

export default SellButton;
