import React, { Component } from 'react';
import Progress from '../../generic-components/Progress';

class ActiveTradeProgress extends Component {
  render() {
    // NOTE / TODO: the status here is mocked for now. It should probably
    // be fetched from our db for a particular transaction
    const progress_map = [
      { status: 'completed', label: '1', text: 'Escrow' },
      { status: 'active', label: '2', text: 'Payment' },
      { status: '', label: '3', text: 'Ether Released' }
    ]
    return(
      <Progress map={progress_map} />
    )
  }
}

export default ActiveTradeProgress
