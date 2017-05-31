import React, { Component } from 'react';

import CompletedTradesContainer from './../ui/CompletedTradesContainer';

class CompletedTrades extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Completed Trades</p>
          <CompletedTradesContainer />
      </div>
    );
  }
}

export default CompletedTrades;
