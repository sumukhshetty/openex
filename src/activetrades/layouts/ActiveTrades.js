import React, { Component } from 'react';

import ActiveTradesContainer from './../ui/ActiveTradesContainer';
import ActiveTradesHeader from './ActiveTradesHeader';

class ActiveTrades extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Active Escrows</p>
        <table>
          <ActiveTradesHeader />
          <ActiveTradesContainer />
        </table>
      </div>
    );
  }
}

export default ActiveTrades;
