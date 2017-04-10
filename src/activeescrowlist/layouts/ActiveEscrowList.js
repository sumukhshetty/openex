import React, { Component } from 'react';

import ActiveEscrowListContainer from './../ui/ActiveEscrowListContainer';
import ActiveTradeHeader from './../../activetrade/layouts/ActiveTradeHeader';

class ActiveEscrowList extends Component {
  render () {
    return (
      <div>
        <h2>Your active escrows</h2>
        <table>
          <ActiveTradeHeader />
          <ActiveEscrowListContainer />
        </table>
      </div>
    );
  }
}

export default ActiveEscrowList;
