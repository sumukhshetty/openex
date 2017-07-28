import React, { Component } from 'react'

class ActiveTradesListEmptyState extends Component {
  render() {
    return (
      <div className="flex mxe">
        <p className="w-two-thirds">
          No active Escrows! Post a trade to get started!
        </p>
      </div>
    )
  }
}

export default ActiveTradesListEmptyState
