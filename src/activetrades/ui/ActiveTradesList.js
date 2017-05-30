import React, { Component } from 'react';

import ActiveTradesRow from './ActiveTradesRow'
import ActiveTradesListEmptyState from './../layouts/ActiveTradesListEmptyState'

class ActiveTradesList extends Component {
  render () {
    var _activeTrades = this.props.activetrades.data;
    if (_activeTrades && this.props.purchaserequests.data) {
      var rows = [];
      Object.entries(_activeTrades).forEach(
            ([key, value]) => {
              rows.push(<ActiveTradesRow purchaseRequest={this.props.purchaserequests.data[key]} purchaseRequestId={key} key={key} tradeType={value.tradeType} user={this.props.user}/>);
            }
        );
      return (
        <tbody>
          {rows}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <ActiveTradesListEmptyState />
        </tbody>
      );
    }
  }
}

export default ActiveTradesList;
