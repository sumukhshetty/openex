import React, { Component } from 'react';
import ActiveBuyOrderContainer from './../ui/ActiveBuyOrderContainer';

class ActiveBuyOrder extends Component {
  render () {
    const progress_map = [
      { status: 'completed', label: '', text: 'Escrow' },
      { status: 'active', label: '', text: 'Payment' },
      { status: '', label: '', text: 'Ether Released' }
    ];
    const step = 'payment';
    // NOTE / TODO: above variables hold mock data

    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveBuyOrderContainer uid={this.props.authData.uid} params={this.props.params} />
        </div>
      </section>
    );
  }
}

export default ActiveBuyOrder;
