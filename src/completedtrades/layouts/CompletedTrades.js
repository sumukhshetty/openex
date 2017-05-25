import React, { Component } from 'react';

import CompletedTradesContainer from './../ui/CompletedTradesContainer';
import CompletedTradesHeader from './CompletedTradesHeader';

class CompletedTrades extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Completed Trades</p>
        <table>
          <CompletedTradesHeader />
          <CompletedTradesContainer />
        </table>
      </div>
    );
  }
}

export default CompletedTrades;
