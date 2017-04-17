import React, { Component } from 'react';
// import ActiveTradeContainer from './../ui/ActiveTradeContainer'
import ActiveTradeHeader from './ActiveTradeHeader';
import ActiveTrade from './ActiveTrade';

// TODO @qjflores deprecate this component
class ActiveTradeContainer extends Component {
  render () {
    return (
      <div>
        <p className='b'>Your active escrows</p>
        <table>
          <ActiveTradeHeader />
          <ActiveTrade />
        </table>
      </div>
    );
  }
}

export default ActiveTradeContainer;
