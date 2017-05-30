import React, { Component } from 'react';

class CompletedTradeListEmptyState extends Component {
  render () {
    return (
      <tr className='flex mxc'>You have not completed a trade yet. Post a trade to get started!</tr>
    );
  }
}

export default CompletedTradeListEmptyState;
