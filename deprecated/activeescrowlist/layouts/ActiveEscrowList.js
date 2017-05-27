// ISSUE-231-27: This entire component should be renamed to activeTradeList
import React, { Component } from 'react';

import ActiveEscrowListContainer from './../ui/ActiveEscrowListContainer';
import ActiveTradeHeader from './../../activetrade/layouts/ActiveTradeHeader';

class ActiveEscrowList extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Active Escrows</p>
        <table>
          <ActiveTradeHeader />
          <ActiveEscrowListContainer />
        </table>
      </div>
    );
  }
}

export default ActiveEscrowList;
