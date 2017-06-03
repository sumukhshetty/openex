import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import * as _ from 'lodash'

import CompletedTradesRowContainer from './CompletedTradesRowContainer';
import CompletedTradesEmptyState from './../layouts/CompletedTradesEmptyState';
import CompletedTradesHeader from './../layouts/CompletedTradesHeader';

class CompletedTrades extends Component {

  render () {
    var completedTrades = this.props.completedtrades.data;
    var list = [];
    Object.entries(completedTrades).forEach(([key, value]) => {
      list.push([key, value])
    })
    var reversedList = _.reverse(list)
    
    if (reversedList) {
      var rows = [];
      reversedList.slice(0,4).forEach((s) => {
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
        <a onClick={()=>browserHistory.push('/completedtrades')}> See More </a>
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
