import React, { Component } from 'react';
// TODO import HelpContainer

class CancelTrade extends Component {
  render () {
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          Resolve Trade Issues
        </p>
        <p>
          Made a mistake with payment or want to try another seller? Never cancel if you already paid the seller.
        </p>
        <div className='tc'>
          <button className='bg-danger' onClick={this.props.cancelTrade}>
            Cancel Trade
          </button>
        </div>
      </div>
    );
  }
}

export default CancelTrade;
