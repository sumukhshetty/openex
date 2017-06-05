import React, { Component } from 'react';

import ActiveTradesContainer from './../ui/ActiveTradesContainer';

class ActiveTrades extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Active Escrows</p>
          <ActiveTradesContainer />
      </div>
    );
  }
}

export default ActiveTrades;
