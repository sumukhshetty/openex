import React, { Component } from 'react'
import { browserHistory } from 'react-router'


class ViewCompletedTradeButton extends Component {

  render() {
    var url = '/activetrade/' + this.props.purchaseRequestId + '/' + this.props.countryCode
    return(
      <td>
        <button onClick={()=>browserHistory.push(url)}>View / Message</button>
      </td>
    )
  }
}

export default ViewCompletedTradeButton
