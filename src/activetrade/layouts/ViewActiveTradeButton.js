import React, { Component } from 'react'
import { Link } from 'react-router'
//TODO import HelpContainer

class ViewActiveTradeButton extends Component {
  render() {
    return(
      <td>
        <Link className="pure-button pure-button-primary view-active-trade-button"
            to="/activetrade/:orderId">View / Message</Link>
        {/* <button class="pure-button pure-button-primary">View / Message</button> */}
        {/* above comment is just for styling reference for the link */}
      </td>
    )
  }
}

export default ViewActiveTradeButton
