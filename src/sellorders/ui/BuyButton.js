import React, { Component } from 'react';
import { browserHistory } from 'react-router'


class BuyButton extends Component {

  render () {
    return (
      <td className='fb5'>
        <button onClick={()=>browserHistory.push('buyTradeOrder/'+this.props.orderId)}> Buy </button>
      </td>
    );
  }
}

export default BuyButton;
