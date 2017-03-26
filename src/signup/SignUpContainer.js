import React, { Component } from 'react'
import SwitchAccounts from './SwitchAccounts'
import WalletComponent from './../wallet/WalletComponent'
import SignUpForm from './SignUpForm'
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
          <WalletComponent />
        </section>

        <section className="signup-form">
          <SignUpForm />
        </section>

        <Help />
      </div>
    )
  }
}

export default SignUpContainer
