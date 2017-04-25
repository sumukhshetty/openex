import React, { Component } from 'react'
import { browserHistory } from 'react-router'

//TODO import HelpContainer

class ViewActiveTradeButton extends Component {
  // TODO @qjflores get trade data from firebase

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
