import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// TODO import HelpContainer

class ViewActiveAdButton extends Component {
  // TODO @qjflores get trade data from firebase

  render() {
    var orderType = (this.props.tradeType === "buy-ether") ? 'activebuyorder' : 'sellorderdetail';
    return(
      <td className='fb10 tc'>
        <button onClick={()=>browserHistory.push(orderType + '/' +this.props.orderId)}>Edit</button>

      </td>
    );
  }
}

export default ViewActiveAdButton;
