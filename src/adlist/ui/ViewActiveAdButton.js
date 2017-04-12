import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// TODO import HelpContainer

class ViewActiveAdButton extends Component {
  // TODO @qjflores get trade data from firebase
  componentWillMount () {
    console.log(this.props);
  }

  render () {
    return (
      <td className='fb10 tc'>
        <button onClick={() => browserHistory.push('activebuyorder/' + this.props.orderId)}>Edit</button>
        {/* <button class="pure-button pure-button-primary">View / Message</button> */}
        {/* above comment is just for styling reference for the link */}
      </td>
    );
  }
}

export default ViewActiveAdButton;
