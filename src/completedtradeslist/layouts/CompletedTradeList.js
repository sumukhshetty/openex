import React, { Component } from 'react';

import CompletedTradeListContainer from './../ui/CompletedTradeListContainer';
import CompletedTradeHeader from './CompletedTradeHeader';

class CompletedTradeList extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Completed Trades</p>
        <table>
          <CompletedTradeHeader />
          <CompletedTradeListContainer />
        </table>
      </div>
    );
  }
}

export default CompletedTradeList;
