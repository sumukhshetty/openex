import React, { Component } from 'react';

class ActiveEscrowListEmptyState extends Component {
  render () {
    return (
      <tr className='flex mxc'>No active Escrows! Post a trade to get started!</tr>
    );
  }
}

export default ActiveEscrowListEmptyState;
