import React, { Component } from 'react';

class CompletedTradesEmptyState extends Component {
  render () {
    return (
      <tr className='flex mxc'>No Completed Trades! Complete a trade to move forward</tr>
    );
  }
}

export default CompletedTradesEmptyState;
