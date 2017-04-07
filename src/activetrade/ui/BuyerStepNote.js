import React, { Component } from 'react';

class BuyerStepNote extends Component {
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
            <p>A seller has accepted your order.</p>
            <p>An escrow contract has been created at address <a href="https://kovan.etherscan.io/address/0xd03fcf6ef9e02e8e2d54ecad19e24369a6e56341">0xd03fcf6ef9e02e8e2d54ecad19e24369a6e56341</a></p>
            <p>When the seller sends the ether to the escrow, you will recieve a notification.</p>
          </div>
        )
      case 'In Escrow':
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
          {/* Show the following only when step === 'payment'. Each step should have its own set of instructions. */}
            <p><strong>Step 1: Pay the seller</strong></p>
            <p>The reference message must be included or the seller can't identify your payment.</p>
            <p>Send a message to the modaboost to receive help with completing the payment.</p>
            <p>
              Method: ICICI
              <br/>
              ICICI Bank
              <br/>
              Name: Victoria Padilla
              Acc Name: 233601500619
              IFSC code: ICIC0002346
              Amount: 7.00 INR
              Refernce/message: L9998255B5YAPB
            </p>
            <p><strong>Step 2: Confirm the Payment</strong></p>
            <p> The Ether is held in escrow for 88 minutes, which it is safe to pay.
            After paying,you need to mark the payment complete or the trade will automatically cancel. </p>
          </div>
        )
      case 'Payment Confirmed':
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
            <p><strong>Waiting for seller to release ether</strong></p>
            <p>Thank you for confirming your payment!</p>
            <p>The seller has been notified, and once they confirm receving the payment, your ether will be released.</p>
          </div>
        )
      case 'Ether Released':
        return(
          <div className="panel bg-smoke center pv3 ph5 w-75">
            <p><strong>Ether has been released</strong></p>
            <p>The seller has released the ether!</p>
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
    return(
      <div className="panel bg-smoke center pv3 ph5 w-75">
      {/* Show the following only when step === 'payment'. Each step should have its own set of instructions. */}
        <p><strong>Step 1: Pay the seller</strong></p>
        <p>The reference message must be included or the seller can't identify your payment.</p>
        <p>Send a message to the modaboost to receive help with completing the payment.</p>
        <p>
          Method: ICICI
          <br/>
          ICICI Bank
          <br/>
          Name: Victoria Padilla
          Acc Name: 233601500619
          IFSC code: ICIC0002346
          Amount: 7.00 INR
          Refernce/message: L9998255B5YAPB
        </p>
        <p><strong>Step 2: Confirm the Payment</strong></p>
        <p> The Ether is held in escrow for 88 minutes, which it is safe to pay.
        After paying,you need to mark the payment complete or the trade will automatically cancel. </p>
      </div>
    )
  }
}

export default BuyerStepNote;
