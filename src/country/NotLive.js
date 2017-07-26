import React, { Component } from 'react'
import WalletComponent from './../wallet/WalletComponent'
import NotLiveFormContainer from './NotLiveFormContainer'

class NotLive extends Component {
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
        <section>
        We're not live in your contry yet! Signup for updates.
        </section>
        <section className="signup-form">
          <NotLiveFormContainer/>
        </section>
        </div>
      : 
      <section>
      <div>Unlock MetaMask and refresh your browser to signup </div>
      </section> 
    }


      </div>
    )
  }
}

export default NotLive
