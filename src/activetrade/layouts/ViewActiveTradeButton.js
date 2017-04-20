import React, { Component } from 'react'
import { browserHistory } from 'react-router'

//TODO import HelpContainer

class ViewActiveTradeButton extends Component {
  // TODO @qjflores get trade data from firebase
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    var url = this.props.tradeType === 'buy-ether' ? 'activebuyorder/' + this.props.orderId : 'activesellorder/' + this.props.orderId;
    return(
      <td>
        <button onClick={()=>browserHistory.push(url)}>View / Message</button>
        {/* <button class="pure-button pure-button-primary">View / Message</button> */}
        {/* above comment is just for styling reference for the link */}
      </td>
    )
  }
}

export default ViewActiveTradeButton
