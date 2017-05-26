import React, { Component } from 'react';

import ActiveTradesRow from './ActiveTradesRow'
import ActiveTradesListEmptyState from './../layouts/ActiveTradesListEmptyState'

class ActiveTradesList extends Component {
  render () {
    console.log("ui.ActiveTradesList.render")
      // console.log('render props');
      // console.log(this.props);
      // ISSUE-231-37: The activeTrades are just a list of keys and values for purchase request objects
      // when you need to get purchase request as an activeTrade then you use the key and get it from
      // purchaserequsests[purchaseRequestId]
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
