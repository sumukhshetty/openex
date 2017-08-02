import React, { Component } from 'react';

class SellerStepNote extends Component {
  render() {

    switch(this.props.step) {
      case 'Awaiting Seller Confirmation':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Awaiting confirmation</p>
            <p>Metamask will prompt to take the amount of transaction into escrow. Once in escrow, the buyer will transfer the amount, and once you receive the amount you release it.
By putting the amount in escrow, niether parties can cheat each other.</p>
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
      case 'Seller Canceled Trade':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Seller Canceled Trade</p>
            <p>The seller has canceled the trade!</p>
          </div>
          )
      case 'Buyer Canceled Trade':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Buyer Canceled Trade</p>
            <p>The buyer has canceled the trade!</p>
          </div>
          )
      case 'Seller Raised Dispute':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Dispute</p>
            <p>You've has raised a dispute. The arbiter will look at evidence from both sides and release funds to the honest party.</p>
          </div>
          )
      case 'Buyer Raised Dispute':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Dispute</p>
            <p>The buyer raised a dispute. The arbiter will look at evidence from both sides and release funds to the honest party.</p>
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
