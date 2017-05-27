import React, { Component } from 'react';
import SellOrdersContainer from './../ui/SellOrdersContainer';

export default class SellOrders extends Component {
  render () {
    return (
      <div className=' w-100 bg-smoke'>
        <div className='w-75 center'>
          <SellOrdersContainer />
        </div>
      </div>
    );
  }
}
