import React, { Component } from 'react';

import ActiveTradeContainer from './ActiveTradeContainer';
import ActiveEscrowListEmptyState from './ActiveEscrowListEmptyState';

class ActiveEscrowList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeTrades: this.props.activeTrades
    };
  }

  componentWillMount () {
    this.props.onBeforeComponentLoads(this.props.web3, this.props);
  }

  render () {
      // console.log('render props');
      // console.log(this.props);
      // ISSUE-231-37: The activeTrades are just a list of purchase request objects
    var _activeTrades = this.props.activeTrades.activeTrades;
    if (_activeTrades) {
      var rows = [];
      Object.entries(_activeTrades).forEach(
            ([key, value]) => {
            {/* ISSUE-231-36: this should be layouts.ActiveTrade - all the css should be done there,
              instead of passing the orderId, pass in the entire purchaseRequest obj
            */}
              rows.push(<ActiveTradeContainer orderId={key} key={key} tradeType={value.tradeType} />);
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
          <ActiveEscrowListEmptyState />
        </tbody>
      );
    }
  }
}

export default ActiveEscrowList;
