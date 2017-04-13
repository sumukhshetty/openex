import React, { Component } from 'react';
// TODO import HelpContainer

class DisputeTrade extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          Resolve Trade Issues
        </p>
        {this.props.type === 'buyer' ? (
           <div>
             <p>
               If the seller does not respond or there is a disagreement regarding the terms of the trade, you can dispute the trade. Ether is held safe in escrow until the dispute
               is resolved.
             </p>
             <p>
               You need to select a reason before you can dispute the trade.
             </p>
           </div>)
           : (<div>
                <p>
                  If the buyer does not respond, does not pay or there is a disagreement regarding the terms of the trade, you can dispute this trade.
                </p>
                <p>
                  Open a dispute with the button below. Automte support will be in contact to resolve the dispute.
                </p>
              </div>)}
        <div className='tc'>
          <button className='bg-danger'>
            Dispute Trade
          </button>
        </div>
      </div>
    );
  }
}

export default DisputeTrade;
