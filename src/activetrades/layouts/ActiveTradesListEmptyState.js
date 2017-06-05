import React, { Component } from 'react';

class ActiveTradesListEmptyState extends Component {
  render () {
    return (
      <div className='flex mxc'>No active Escrows! Post a trade to get started!</div>
    );
  }
}

export default ActiveTradesListEmptyState;
