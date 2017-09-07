import React, { Component } from 'react'
import WalletComponent from './../wallet/WalletComponent'
import SignUpFormContainer from './../user/ui/signupform/SignUpFormContainer'
import Help from './Help'
import unlock from '../images/unlock.gif'

class SignUpContainer extends Component {
  render() {
    return(
      <div className="ethereum-automte">
        <section>
          <h3>Your Address</h3>
        </section>
    {this.props.web3.eth.accounts[0] ?
      <div>
        <section className="metamask">
          <WalletComponent web3={this.props.web3}/>
        </section>

        <section className="signup-form">
          <SignUpFormContainer/>
        </section>
        </div>
      :
      <section>
      <div>Unlock MetaMask and refresh your browser to signup </div>
      <img src={unlock} alt='' className='unlock-gif' />
      </section>
    }


        <Help />
      </div>
    )
  }
}

export default SignUpContainer
