import React, { Component } from 'react';

class StepNote extends Component {
  render() {

    console.log("On step: ", this.props.step, " [StepNote.js]");
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

export default StepNote;
