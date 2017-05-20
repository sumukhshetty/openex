import React, { Component } from 'react'
import { browserHistory } from 'react-router'


class ViewActiveTradeButton extends Component {

  // ISSUE-231-39: Change the url from activebuyorder and activesellorder to activetrade,
  // change the orderId to purchaseRequestId
  render() {
    var url = this.props.tradeType === 'buy-ether' ? 'activebuyorder/' + this.props.orderId : 'activesellorder/' + this.props.orderId;
    return(
      <td>
        <button onClick={()=>browserHistory.push(url)}>View / Message</button>
      </td>
    )
  }
}

export default ViewActiveTradeButton
