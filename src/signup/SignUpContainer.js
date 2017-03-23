import React, { Component } from 'react'
import SwitchAccounts from './SwitchAccounts'
import WalletComponent from './../wallet/WalletComponent'
import SignUpForm from './SignUpForm'
import Help from './Help'



class SignUpContainer extends Component {
  render() {
    return(
      <div>
      SignUpContainer
      <SwitchAccounts />
      <WalletComponent />
      <SignUpForm />
      <Help />
      </div>
    )
  }
}

export default SignUpContainer
