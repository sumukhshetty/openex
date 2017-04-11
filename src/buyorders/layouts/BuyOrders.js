import React, { Component } from 'react';
import BuyOrdersContainer from './../ui/BuyOrdersContainer';

export default class BuyOrders extends Component {
  render () {
    return (
      <div className='w-100 bg-smoke'>
        <div className='w-75 center'>
          <BuyOrdersContainer />
        </div>
      </div>
    );
  }
}
