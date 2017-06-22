import React, { Component } from 'react'

class AdminStepNote extends Component {

  render () {
    console.log("AdminStepNote")
    console.log(this.props)
    var style = {
      marginTop:'1em'
    }
    return (
      <div>
        <div className='measure pb4'>
          <div className='tc'>
            <div>
              <button className='bg-blue' onClick={this.props.assignArbiter}>Assgin to Me</button>
            </div>
          </div>
          <p className='tc flarge b'>Vote</p>
          <p>This is final, It cannot be undone. Make sure that you have solved the dispute with concrete evidence and answers from both sides.
              </p>
        </div>
        <div className='tc'>

        <div>
        <button
          className='bg-blue'
          onClick={this.props.releaseToSeller}>
              Release To Seller
        </button>
        </div>
        <div style={style}>
        <button
          className='bg-blue'
          onClick={this.props.releaseToBuyer}>
              Release To Buyer
        </button>
        </div>
          <div className='measure pb4'>
            <p className='tc flarge b'>Guide</p>
            <ol className='tl'>
              <p>Arbiter gets added to the chat
                    the arbiter asks what is the issue that needs to be resolved
                  </p>
              <li>The buyer claims he's paid, the seller says he hasn't recieved the payment
                    -the arbiter tells the chatroom - for the buyer to provide receipt and the seller for proof of nonpayment
                    look at the time that the transactions are happening
                    -ask them to get on a skype call and login to show us the transaction
                    -what happens if they are fake
                    -can't reupload photos
                  </li>
              <li>the seller is not contactable
                    -arbiter tells the chatroom that the seller he has 24 hours to respond or the ether gets released
                  -arbiter sends and email to the seller about not being contactable</li>
              <li>the buyer wants to change the price of the ether but the seller doesn't want to
                  -seller wins</li>
              <li>an error on the buyer transfer
                    they transfered it to a wrong account
                  seller wins</li>
            </ol>
            <p>When a seller accepts your order, you will recieve a notification.</p>
          </div>
        </div>
      </div>
    )
  }
  }

export default AdminStepNote
