import React, { Component } from 'react';
import EditTradeAdvertisementContainer from './../ui/EditTradeAdvertisementContainer'

export default class EditTradeAdvertisement extends Component {

  render () {
    return (
      <div className='bg-smoke'>
        <div className='w-75 center pv3'>
        <EditTradeAdvertisementContainer tradeAdvertisementType={this.props.params.tradeAdvertisementType} 
          tradeAdvertisementId={this.props.params.tradeAdvertisementId} />
        </div>
      </div>
    );
  }
}
