import React, { Component } from 'react';

import TradeAdvertisementsContainer from './../ui/TradeAdvertisementsContainer';
import { browserHistory } from 'react-router'

class TradeAdvertisements extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Advertisements</p>
          <TradeAdvertisementsContainer />
        <div className='flex mxe pv3'>
          <button onClick={() => {browserHistory.push('posttrade')}} className='grow'>+ Create Advertisement</button>
        </div>
      </div>
    );
  }
}

export default TradeAdvertisements;
