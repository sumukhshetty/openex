import React, { Component } from 'react';

import AdListContainer from './../ui/AdListContainer';
import ActiveTradeHeader from './../../activetrade/layouts/ActiveTradeHeader';

class AdList extends Component {
  render () {
    return (
      <div>
        <h2>Your advertisements</h2>
        <table>
          <ActiveTradeHeader />
          <AdListContainer />
        </table>
      </div>
    );
  }
}

export default AdList;
