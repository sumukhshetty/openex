import React, { Component } from 'react'
import { Link } from 'react-router'
//TODO import HelpContainer

class ViewActiveTradeButton extends Component {
  // TODO @qjflores get trade data from firebase
  render() {
    return(
      <td>
        <Link className="pure-button pure-button-primary view-active-trade-button"
            to="/activetrade/0x7c93ffa3ad863aeda6d24d16265b9e2b35a6e5ef14dba88af874608661f04b6c">View / Message</Link>
        {/* <button class="pure-button pure-button-primary">View / Message</button> */}
        {/* above comment is just for styling reference for the link */}
      </td>
    )
  }
}

export default ViewActiveTradeButton
