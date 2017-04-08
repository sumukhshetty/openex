import React, { Component } from 'react';

class SellerStepNote extends Component {
  render() {

    const step_notes = {
      'Initiated': [
        { status: '', label: '', text: 'Escrow' },
        { status: '', label: '', text: 'Payment' },
        { status: '', label: '', text: 'Ether Released' }
      ],
      'Contract Created': [
        { status: 'active', label: '', text: 'Escrow' },
        { status: '', label: '', text: 'Payment' },
        { status: '', label: '', text: 'Ether Released' }
      ],
      'In Escrow': [
        { status: 'completed', label: '', text: 'Escrow' },
        { status: 'active', label: '', text: 'Payment' },
        { status: '', label: '', text: 'Ether Released' }
      ],
      'Payment Confirmed': [
        { status: 'completed', label: '', text: 'Escrow' },
        { status: 'completed', label: '', text: 'Payment' },
        { status: 'active', label: '', text: 'Ether Released' }
      ],
      'Ether Released': [
        { status: 'completed', label: '', text: 'Escrow' },
        { status: 'completed', label: '', text: 'Payment' },
        { status: 'completed', label: '', text: 'Ether Released' }
      ]
    }
    console.log("On step: ", this.props.step, " [StepNote.js]");
    switch(this.props.step) {
      case 'Initiated':
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
            <p><strong>Waiting for a seller</strong></p>
            <p>Your advertisement is up on Automte!</p>
            <p>When a seller accepts your order, you will recieve a notification.</p>
          </div>
        )
      case 'Contract Created':
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
            <p><strong>Waiting for escrow</strong></p>
            <p>You have accepted the order.</p>
            <p>An escrow contract has been created at address <a href="https://kovan.etherscan.io/address/0xd03fcf6ef9e02e8e2d54ecad19e24369a6e56341">0xd03fcf6ef9e02e8e2d54ecad19e24369a6e56341</a></p>
            <p>Please send the ether to the address.</p>
          </div>
        )
      case 'In Escrow':
      return(
        <div className="panel bg-smoke center pv3 ph5 w-75">
          <p><strong>Waiting for buyer to send payment</strong></p>
          <p>Thank you for sending the ether into escrow!</p>
          <p>The buyer has been notified. Please contact them if necessary.</p>
        </div>
      )
      case 'Payment Confirmed':
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
            <p><strong>Buyer has confirmed payment</strong></p>
            <p>The buyer has reported that they sent the payment.</p>
            <p>Please confirm that you have received the payment to release the ether to the buyer.</p>
          </div>
        )
      case 'Ether Released':
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
            <p><strong>Ether has been released</strong></p>
            <p>Thank you for releasing the ether!</p>
            <p>Click <a href="https://kovan.etherscan.io/address/0xd03fcf6ef9e02e8e2d54ecad19e24369a6e56341">here</a> to view the transcation.</p>
          </div>
        )
      default:
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
            <p><strong>Invalid State Error</strong></p>
            <p>Please contact support.</p>
          </div>
        )
    }
  }
}

export default SellerStepNote;
