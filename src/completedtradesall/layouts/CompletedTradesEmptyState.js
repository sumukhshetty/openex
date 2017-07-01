import React, { Component } from 'react';

class CompletedTradesEmptyState extends Component {
  render () {
    return (
      <div className='flex mxc'>No Completed Trades! Complete a trade to move forward</div>
    );
  }
}

export default CompletedTradesEmptyState;
