import React, { Component } from 'react'

class CompletedTradesEmptyState extends Component {
  render() {
    return (
      <div className="flex mxe">
        <p className="w-two-thirds">
          No Completed Trades! Complete a trade to move forward
        </p>
      </div>
    )
  }
}

export default CompletedTradesEmptyState
