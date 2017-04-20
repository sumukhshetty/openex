import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// TODO import HelpContainer

class ViewActiveAdButton extends Component {
  // TODO @qjflores get trade data from firebase
  componentWillMount () {
    console.log(this.props);
  }

  render() {
    console.log('view button orderType');
    console.log(this.props.tradeType);
    var orderType = (this.props.tradeType === "buy-ether") ? 'activebuyorder' : 'sellorderdetail';
    return(
      <td className='fb10 tc'>
        <button onClick={()=>browserHistory.push(orderType + '/' +this.props.orderId)}>Edit</button>
        {/* <button class="pure-button pure-button-primary">View / Message</button> */}
        {/* above comment is just for styling reference for the link */}
      </td>
    );
  }
}

export default ViewActiveAdButton;
