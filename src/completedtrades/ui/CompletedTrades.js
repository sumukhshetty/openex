import React, { Component } from 'react';

import CompletedTradesRowContainer from './CompletedTradesRowContainer';
import CompletedTradesEmptyState from './../layouts/CompletedTradesEmptyState';

class CompletedTrades extends Component {

  render () {
    console.log('completedtrades.ui.CompletedTrades')
    var completedTrades = this.props.completedtrades.data;
    if (completedTrades) {
      var rows = [];
      Object.entries(completedTrades).forEach(
            ([key, value]) => {
              rows.push(<CompletedTradesRowContainer purchaseRequestId={key} key={key} tradeType={value.tradeType} />);
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
