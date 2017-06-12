import React, { Component } from 'react'
import factoryAddress from './../../contract_addresses/orderfactory.js'

class VerifyWallet extends Component {
  constructor(props){
    super(props)
    this.verifyWallet = this.verifyWallet.bind(this)
  }

  componentWillMount(){
    this.props.beforeComponentMounts(this.props.web3)
  }
  verifyWallet(e) {
    //this.props.verifyWallet(this.props.web3.web3)
    console.log(this.props.user)
    var message = this.props.web3.web3.sha3("buyether.automte")
    var component = this
    this.props.web3.web3.eth.sign(this.props.web3.web3.eth.accounts[0], message, function(error, result){
        //change the contents of the verifyAccount
        if(error){
          console.log(error)
          component.props.verifyWallet(false)
        } else {
          if (component.props.user.profile.orderBookAddress){
            component.props.loadETHOrderBook(component.props.web3.web3, component.props.user.profile.orderBookAddress)
          }
          console.log()
          component.props.loadOrderBookFactory(component.props.web3.web3, factoryAddress.kovanAddress)
          component.props.verifyWallet(true)
        }
      })
  }

  render() {
    const verifyWalletDispaly = (!this.props.web3.verified ? 
      <div className="flex x">
        <div className="pa4">Automte needs you to verify your wallet address</div>
        <div className="pa4">
        <button onClick={this.verifyWallet.bind(this)}>Verify Wallet</button>
        </div>
      </div>
      : null
      )

    return (
      <div >
        {verifyWalletDispaly}
      </div>
    )
  }
}

export default VerifyWallet