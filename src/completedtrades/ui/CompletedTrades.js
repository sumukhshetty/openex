import React, { Component } from 'react';

import CompletedTradesRowContainer from './CompletedTradesRowContainer';
import CompletedTradesEmptyState from './../layouts/CompletedTradesEmptyState';
import CompletedTradesHeader from './../layouts/CompletedTradesHeader';

class CompletedTrades extends Component {

  render () {
    var completedTrades = this.props.completedtrades.data;
    if (completedTrades) {
      var rows = [];
      Object.entries(completedTrades).forEach(
            ([key, value]) => {
              rows.push(<CompletedTradesRowContainer purchaseRequestId={key} key={key} tradeType={value.tradeType} />);
            }
        );
      return (
        <table>
          <CompletedTradesHeader />
        <tbody>
          {rows}
        </tbody>
        </table>
      );
    } else {
      return (
        <div>
          <CompletedTradesEmptyState />
        </div>
      );
    }
  }
}

export default CompletedTrades;
