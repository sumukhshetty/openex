import React, { Component } from 'react';

import ActiveTradeContainer from './ActiveTradeContainer';
import ActiveEscrowListEmptyState from './ActiveEscrowListEmptyState';
import ActiveTradesRow from './ActiveTradesRow'

class ActiveTradesList extends Component {

  componentWillMount () {
    this.props.onBeforeComponentLoads(this.props.web3, this.props);
  }

  render () {
      // console.log('render props');
      // console.log(this.props);
      // ISSUE-231-37: The activeTrades are just a list of keys and values for purchase request objects
      // when you need to get purchase request as an activeTrade then you use the key and get it from
      // purchaserequsests[purchaseRequestId]
    var _activeTrades = this.props.activetrades;
    if (_activeTrades) {
      var rows = [];
      Object.entries(_activeTrades).forEach(
            ([key, value]) => {
            {/* ISSUE-231-36: this should be layouts.ActiveTrade - all the css should be done there,
              instead of passing the orderId, pass in the entire purchaseRequest obj
            */}
              rows.push(<ActiveTradesRow purchaseRequest={this.props.purchaserequests[key]} purchaseRequestId={key} key={key} tradeType={value.tradeType} />);
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
