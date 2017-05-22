import React, { Component } from 'react';
import SellTradeAdvertisementsContainer from './../ui/SellTradeAdvertisementsContainer';

export default class SellOrders extends Component {
  render () {
    return (
      <div className=' w-100 bg-smoke'>
        <div className='w-75 center'>
          <SellTradeAdvertisementsContainer />
        </div>
      </div>
    );
  }
}
