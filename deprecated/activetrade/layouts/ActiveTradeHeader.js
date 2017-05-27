import React, { Component } from 'react'
// TODO import HelpContainer

class ActiveTradeHeader extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th className='fb5 tc'>ID</th>
          <th className='fb15 tc'>Created at</th>
          <th className='fb10 tc'>Info</th>
          <th className='fb15 tc'>Username</th>
          <th className='fb10 tc'>Ether</th>
          <th className='fb10 tc'>Amount</th>
          <th className='fb10 tc'>Status</th>
          <th className='fb10 tc'>Last Online</th>
          <th className='fb10 tc'>&nbsp;</th>
        </tr>
      </thead>
    )
  }
}

export default ActiveTradeHeader
