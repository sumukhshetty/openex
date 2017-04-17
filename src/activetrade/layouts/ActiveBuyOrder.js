import React, { Component } from 'react';
import ActiveBuyOrderContainer from './../ui/ActiveBuyOrderContainer';

class ActiveBuyOrder extends Component {
  render () {

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
