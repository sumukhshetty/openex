import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import * as _ from 'lodash'

import CompletedTradesRowContainer from './CompletedTradesRowContainer';
import CompletedTradesEmptyState from './../layouts/CompletedTradesEmptyState';
import CompletedTradesHeader from './../layouts/CompletedTradesHeader';

class CompletedTrades extends Component {

  render () {
    if (this.props.completedtrades.data) {
      var completedTrades = this.props.completedtrades.data;
      var list = [];
      Object.entries(completedTrades).forEach(([key, value]) => {
        list.push([key, value])
      })
      var reversedList = _.reverse(list)
      var rows = [];
      reversedList.forEach((s) => {
        rows.push(<CompletedTradesRowContainer purchaseRequestId={s[0]} key={s[0]} tradeType={s[1].tradeType} />);
      })

      return (
        <div>
        <table>
          <CompletedTradesHeader />
        <tbody>
          {rows}
        </tbody>
        </table>
        </div>
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
