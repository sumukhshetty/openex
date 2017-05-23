import React, { Component } from 'react'
import { browserHistory } from 'react-router'


class ViewActiveTradeButton extends Component {

  render() {
    var url = '/activetrade/' + this.props.purchaseRequestId
    return(
      <td>
        <button onClick={()=>browserHistory.push(url)}>View / Message</button>
      </td>
    )
  }
}

export default ViewActiveTradeButton
