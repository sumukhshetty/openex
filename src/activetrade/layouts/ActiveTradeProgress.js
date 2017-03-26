import React, { Component } from 'react'

class ActiveTradeProgress extends Component {
  render() {
    return(
      <div>
        <li>
          Escrow
        </li>   
        <li>
          Payment
        </li>
        <li>
          Ether Released
        </li>   
      </div>
    )
  }
}

export default ActiveTradeProgress
