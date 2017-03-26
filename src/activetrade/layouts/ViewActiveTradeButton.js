import React, { Component } from 'react'
import { Link } from 'react-router'
//TODO import HelpContainer

class ViewActiveTradeButton extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <li className="pure-menu-item">
            <Link to="/activetrade/:orderId">View/Message</Link>
          </li>
          </div>
        </div>
      </main>
    )
  }
}

export default ViewActiveTradeButton
