import React, { Component } from 'react';

class SellerStepNote extends Component {
  render() {

    console.log("On step: ", this.props.step, " [StepNote.js]");
    switch(this.props.step) {
      case 'Awaiting Seller Confirmation':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Awaiting confirmation</p>
            <p>A buyer has requested to purchase ether from you.</p>
            <p>Please confirm here to begin the trade.</p>
          </div>
        )
      case 'Awaiting Payment':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Waiting for buyer to send payment</p>
            <p>You have accepted the order.</p>
            <p>The buyer has been notified. Please contact them if necessary.</p>
          </div>
        )
      case 'Awaiting Release':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Buyer has confirmed payment</p>
            <p>The buyer has reported that they sent the payment.</p>
            <p>Please confirm that you have received the payment to release the ether to the buyer.</p>
          </div>
        )
      case 'Ether Released':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Ether has been released</p>
            <p>Thank you for releasing the ether!</p>
            <p>Click <a href="https://kovan.etherscan.io/address/0xd03fcf6ef9e02e8e2d54ecad19e24369a6e56341">here</a> to view the transcation.</p>
          </div>
        )
      default:
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Invalid State Error</p>
            <p>Please contact support.</p>
          </div>
        )
    }
  }
}

export default SellerStepNote;
