import React, { Component } from 'react'
//TODO import HelpContainer

class ActiveTradeHeader extends Component {
  render() {
    return(
      <thead>
        <tr>
          <th>#</th>
          <th>Created at</th>
          <th>Info</th>
          <th>Username</th>
          <th>Ether</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Last Online</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
    )
  }
}

export default ActiveTradeHeader
