import React, { Component } from 'react'
import factoryAddress from './../../contract_addresses/orderfactory.js'

class VerifyWallet extends Component {
  constructor(props){
    super(props)
    this.state={
      isButtonDisabled:false
    }
    this.verifyWallet = this.verifyWallet.bind(this)
  }

  componentWillMount(){
    this.props.beforeComponentMounts(this.props.web3)
  }
  verifyWallet(e) {
    var message = this.props.web3.web3.sha3("buyether.automte")
    var component = this
    this.setState({isButtonDisabled:true})
    this.props.web3.web3.eth.sign(this.props.web3.web3.eth.accounts[0], message, function(error, result){
        //change the contents of the verifyAccount
        if(error){
          console.log(error)
          component.props.verifyWallet(false)
        } else {
          if (component.props.user.profile.orderBookAddress){
            component.props.loadETHOrderBook(component.props.web3.web3, component.props.user.profile.orderBookAddress)
          }
          switch(component.props.web3.web3.version.network) {
              case '42':
                  component.props.wrongNetwork(false)
                  break;
              default:
                  component.props.wrongNetwork(true)
          }
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
        <button onClick={this.verifyWallet.bind(this)} disabled={this.state.isButtonDisabled}>Verify Wallet</button>
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