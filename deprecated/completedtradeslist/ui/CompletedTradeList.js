import React, { Component } from 'react';

import CompletedTradeContainer from './CompletedTradeContainer';
import CompletedTradeListEmptyState from './CompletedTradeListEmptyState';

class CompletedTradeList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      completedTrades: this.props.completedTrades
    };
  }

  componentWillMount () {
    this.props.onBeforeComponentLoads(this.props.web3, this.props);
  }

  render () {
      // console.log('render props');
      // console.log(this.props);
    var completedTrades = this.props.completedTrades.completedTrades;
    if (completedTrades) {
      var rows = [];
      Object.entries(completedTrades).forEach(
            ([key, value]) => {
              rows.push(<CompletedTradeContainer orderId={key} key={key} tradeType={value.tradeType} />);
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
          <CompletedTradeListEmptyState />
        </tbody>
      );
    }
  }
}

export default CompletedTradeList;
