import React, { Component } from 'react';

import ActiveTradesRow from './ActiveTradesRow'

class ActiveTradesList extends Component {
  render () {
    var _activeTrades = this.props.activetrades.data;
    if (_activeTrades && this.props.purchaserequests.data) {
      var rows = [];
      Object.entries(_activeTrades).forEach(
            ([key, value]) => {
              rows.push(<ActiveTradesRow purchaseRequest={this.props.purchaserequests.data[key]} purchaseRequestId={key} key={key} tradeType={value.tradeType} user={this.props.user} presence={this.props.presence}/>);
            }
        );
      return (
        <tbody>
          {rows}
        </tbody>
      );
    } else {
      return null
    }
  }
}

export default ActiveTradesList;
