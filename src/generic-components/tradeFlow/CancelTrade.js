import React, { Component } from 'react';
// TODO import HelpContainer

class CancelTrade extends Component {
  confirmCancel(){
    if(window.confirm("Are you sure you want to cancel this trade?")){
      this.props.cancelTrade()
    }
  }

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
          <button className='bg-danger' onClick={this.confirmCancel.bind(this)}>
            Cancel Trade
          </button>
        </div>
      </div>
    );
  }
}

export default CancelTrade;
