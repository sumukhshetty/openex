import React, { Component } from 'react';

import CompletedTradeRowContainer from './CompletedTradeRowContainer';
import CompletedTradesEmptyState from './../layouts/CompletedTradesEmptyState';

class CompletedTrades extends Component {

  render () {
    var completedTrades = this.props.completedtrades.data;
    if (completedTrades) {
      var rows = [];
      Object.entries(completedTrades).forEach(
            ([key, value]) => {
              rows.push(<CompletedTradeRowContainer purchaseRequestId={key} key={key} tradeType={value.tradeType} />);
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
          <CompletedTradesEmptyState />
        </tbody>
      );
    }
  }
}

export default CompletedTrades;
