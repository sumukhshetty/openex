import React, { Component } from 'react';
import Progress from '../../generic-components/Progress';

class ActiveTradeProgress extends Component {
  render() {
    // NOTE / TODO: the status here is mocked for now. It should probably
    // be fetched from our db for a particular transaction
    const progress_map = this.props.progress_map;

    return(
      <Progress progress_map={progress_map} />
    )
  }
}

export default ActiveTradeProgress
