import React, { Component } from 'react';

import AdListContainer from './../ui/AdListContainer';
import ActiveTradeHeader from './../../activetrade/layouts/ActiveTradeHeader';

class AdList extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your advertisements</p>
        <table>
          <ActiveTradeHeader />
          <AdListContainer />
        </table>
        <div className='flex mxe pv3'>
          <button className='grow'>+ Create Advertisement</button>
        </div>
      </div>
    );
  }
}

export default AdList;
