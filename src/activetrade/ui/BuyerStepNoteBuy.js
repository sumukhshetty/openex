import React, { Component } from 'react';

class BuyerStepNote extends Component {
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
            <p>A seller has accepted your order.</p>
            <p>An escrow contract has been created at address <a href={"https://kovan.etherscan.io/address/"+this.props.contractAddress}>{this.props.contractAddress}</a></p>
            <p>When the seller sends the ether to the escrow, you will recieve a notification.</p>
          </div>
        )
      case 'In Escrow':
        return(
          <div className="measure pb4">
          {/* Show the following only when step === 'payment'. Each step should have its own set of instructions. */}
            <p className='tc flarge b'>Step 1: Pay the seller</p>
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
            <p><p>Step 2: Confirm the Payment</p></p>
            <p> The Ether is held in escrow for 88 minutes, which it is safe to pay.
            After paying,you need to mark the payment complete or the trade will automatically cancel. </p>
          </div>
        )
      case 'Payment Confirmed':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Waiting for seller to release ether</p>
            <p>Thank you for confirming your payment!</p>
            <p>The seller has been notified, and once they confirm receving the payment, your ether will be released.</p>
          </div>
        )
      case 'Ether Released':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Ether has been released</p>
            <p>The seller has released the ether!</p>
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

export default BuyerStepNote;
