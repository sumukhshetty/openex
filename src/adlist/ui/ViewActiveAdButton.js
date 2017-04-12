import React, { Component } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

//TODO import HelpContainer

class ViewActiveAdButton extends Component {
  // TODO @qjflores get trade data from firebase
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    var orderType = (this.props.orderType === 'buy-ether') ? 'activebuyorder' : 'sellorderdetail';
    return(
      <td>
        <button onClick={()=>browserHistory.push(orderType + '/' +this.props.orderId)}>Edit</button>
        {/* <button class="pure-button pure-button-primary">View / Message</button> */}
        {/* above comment is just for styling reference for the link */}
      </td>
    )
  }
}

export default ViewActiveAdButton
