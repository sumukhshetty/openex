import React, { Component } from 'react';

class BuyerStepNote extends Component {
  render() {
    switch(this.props.step) {
      case 'Awaiting Seller Confirmation':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Awaiting Seller Confirmation</p>
            <p>Your request has been sent to the seller.</p>
            <p>When the seller confirms your purchase request, you will recieve a notification.</p>
          </div>
        )
      case 'Awaiting Payment':
        return(
          <div className="measure pb4">
          {/* Show the following only when step === 'payment'. Each step should have its own set of instructions. */}
            <p className='tc flarge b'>Step 1: Pay the seller</p>
            <p>The reference message must be included or the seller can't identify your payment.</p>
            <p className='tc flarge b'>{this.props.purchaseRequestId}</p>
            <p>Send a message to {this.props.activetrade.sellerUsername} to receive help with completing the payment.</p>
            <p>
              Method: {this.props.activetrade.paymentMethod}
              <br/>
              Payment Info: {this.props.activetrade.bankinformation}
            </p>
            <p className='tc flarge b'>Step 2: Confirm the Payment</p>
            <p> The Ether is held in escrow for {this.props.activetrade.timeLimit ? this.props.activetrade.timeLimit : '-'} minutes, which it is safe to pay.
            After paying,you need to mark the payment complete. </p>
          </div>
        )
      case 'Awaiting Release':
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
            {/*<p>Click <a href="https://etherscan.io/address/0xd03fcf6ef9e02e8e2d54ecad19e24369a6e56341">here</a> to view the transcation.</p>*/}
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
            <p>The seller has raised a dispute. The arbiter will look at evidence from both sides and release funds to the honest party.</p>
          </div>
          )
      case 'Buyer Raised Dispute':
        return(
          <div className="measure pb4">
            <p className='tc flarge b'>Dispute</p>
            <p>You've raised a dispute. The arbiter will look at evidence from both sides and release funds to the honest party.</p>
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
