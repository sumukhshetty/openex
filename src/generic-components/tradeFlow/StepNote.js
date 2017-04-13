import React, { Component } from 'react';

class StepNote extends Component {
  render () {
    switch (this.props.step) {
      case 'Initiated':
        return (
          <div className='measure pb4'>
            <p className='tc flarge b'>
              Step 1: Seller confirms trade
            </p>
            <p>
              We have notified the seller about the transaction. Seller will approve the transaction and put up the money for escrow.
            </p>
          </div>
        );
      case 'In Escrow':
        return (
          <div className='measure pb4'>
            {/* Show the following only when step === 'payment'. Each step should have its own set of instructions. */}
            <p>
              <p className='tc flarge b'>
                Step 2: Pay the seller
              </p>
            </p>
            <p>
              The reference message must be included or the seller cant identify your payment. Send a message to the modaboost to receive help with completing the payment.
            </p>
            <ul className='list pl0'>
              <li>
                Method: ICICI
              </li>
              <li>
                ICICI Bank
              </li>
              <li>
                Name: Victoria Padilla
              </li>
              <li>
                Acc number : 233601500619
              </li>
              <li>
                Ifsc code= ICIC0002346
              </li>
              <li>
                Amount: 7.00 INR
              </li>
              <li>
                Reference/message: L9998255B5YAPB
              </li>
            </ul>
            <p>
              <p className='tc flarge b pt3'>
                Step 3: Confirm The Payment
              </p>
            </p>
            <p>
              The bitcoins are held in escrow for 88 minutes, during which it is safe to pay. After paying, you need to mark payment complete or the trade will automatically cancel.
            </p>
          </div>
        );
      case 'Release Ether':
        return (
          <div className='measure pb4'>
            <p className='tc flarge b'>
              Release Ether
            </p>
            <p>
              The buyer has not yet marked the payment complete and has 89 minutes to make the payment before the trade is automatically canceled.
            </p>
            <p>
              When you receive the payment, release the escrow.
            </p>
          </div>
        );
      case 'Payment Confirmed':
        return (
          <div className='measure pb4'>
            <p className='tc flarge b pt3'>
              Step 4: Release of Coins
            </p>
            <p>
              The seller will look into the bank account and the transaction reciepts that you have sent. He will then release the ether.
            </p>
          </div>
        );
      default:
        return (
          <div className='measure pb4 bg-danger white br2 tc'>
            <p className='flarge b pt3'>
              Invalid State Error
            </p>
            <p>
              Please contact support.
            </p>
          </div>
        );
    }
    return (
      <div className='panel bg-smoke center pv3 ph5 w-75'>
        {/* Show the following only when step === 'payment'. Each step should have its own set of instructions. */}
        <p>
          <strong>Step 1: Pay the seller</strong>
        </p>
        <p>
          The reference message must be included or the seller cant identify your payment.
        </p>
        <p>
          Send a message to the modaboost to receive help with completing the payment.
        </p>
        <p>
          Method: ICICI
          <br/> ICICI Bank
          <br/> Name: Victoria Padilla Acc Name: 233601500619 IFSC code: ICIC0002346 Amount: 7.00 INR Refernce/message: L9998255B5YAPB
        </p>
        <p>
          <strong>Step 2: Confirm the Payment</strong>
        </p>
        <p>
          The Ether is held in escrow for 88 minutes, which it is safe to pay. After paying,you need to mark the payment complete or the trade will automatically cancel.
        </p>
      </div>
    );
  }
}

export default StepNote;
