import React, { Component } from 'react';

class SellerStepNote extends Component {
  render() {

    console.log("On step: ", this.props.step, " [StepNote.js]");
    switch(this.props.step) {
      case 'Initiated':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Waiting for a seller</p>
            <p>Your advertisement is up on Automte!</p>
            <p>When a seller accepts your order, you will recieve a notification.</p>
          </div>
        )
      case 'Awaiting Escrow':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Waiting for escrow</p>
            <p>You have accepted the order.</p>
            <p>An escrow contract has been created at address <a href={"https://kovan.etherscan.io/address/"+this.props.contractAddress}>{this.props.contractAddress}</a></p>
            <p>Please send the ether to the address.</p>
          </div>
        )
      case 'In Escrow':
      return(
        <div className="measure pb4">
          <p className='tc flarge b'>Waiting for buyer to send payment</p>
          <p>Thank you for sending the ether into escrow!</p>
          <p>The buyer has been notified. Please contact them if necessary.</p>
        </div>
      )
      case 'Payment Confirmed':
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
