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
    {this.props.account ?
      <div>
        <section className="metamask">
          <WalletComponent account={this.props.account}/>
        </section>

        <section className="signup-form">
          <SignUpFormContainer/>
        </section>
        </div>
      :
      <section>
      <div>Please Unlock MetaMask to signup or login </div>
      <img src={unlock} alt='' className='unlock-gif' />
      </section>
    }


        <Help />
      </div>
    )
  }
}

export default SignUpContainer
