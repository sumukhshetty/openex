import React, { Component } from 'react'
import SwitchAccounts from './SwitchAccounts'
import WalletComponent from './../wallet/WalletComponent'
import SignUpFormContainer from './../user/ui/signupform/SignUpFormContainer'
import Help from './Help'



class SignUpContainer extends Component {
  render() {
    return(
      <div className="ethereum-automte">
        <section>
          <h3>Sign Up</h3>
          <SwitchAccounts />
        </section>

        <section className="metamask">
          <WalletComponent web3={this.props.web3}/>
        </section>

        <section className="signup-form">
          <SignUpFormContainer />
        </section>

        <Help />
      </div>
    )
  }
}

export default SignUpContainer
