import React, { Component } from 'react'
import factoryAddress from './../../contract_addresses/orderfactory.js'

class VerifyWallet extends Component {
  constructor(props){
    super(props)
    this.state={
      isButtonDisabled:false,
      errorMessage: null
    }
    this.verifyWallet = this.verifyWallet.bind(this)
  }

  componentWillMount(){
    this.props.beforeComponentMounts(this.props.web3)
  }
  verifyWallet(e) {
    var message = this.props.web3.data.sha3("buyether.automte")
    var component = this
    this.setState({isButtonDisabled:true, errorMessage:null})
    try{
      this.props.web3.data.eth.sign(this.props.web3.data.eth.accounts[0], message, function(error, result){
          //change the contents of the verifyAccount
          if(error){
            console.log(error)
            component.setState({isButtonDisabled:false})
            component.props.verifyWallet(false)
          } else {
            if (component.props.user.profile.orderBookAddress){
              component.props.loadETHOrderBook(component.props.web3.data, component.props.user.profile.orderBookAddress)
            }
            switch(component.props.web3.data.version.network) {
                case '42':
                    component.props.wrongNetwork(false)
                    break;
                default:
                    component.props.wrongNetwork(true)
            }
            component.props.loadOrderBookFactory(component.props.web3.data, factoryAddress.kovanAddress)
            component.props.verifyWallet(true)
          }
        })
    } catch (error) {
      console.log("ui.VerifyWallet.verifyWallet.catch")
      console.log(error.message)
      if(error.message==='invalid address'){
        this.setState({errorMessage:"Looks like MetaMask is locked, please unlock it and try to verify your wallet",isButtonDisabled:false})
      }
    }
  }

  render() {
    const verifyWalletDispaly = (!this.props.web3.verified ? 
      <div className="center pv3">
        <div className="pa4 w-50 center">Automte needs you to verify your wallet address</div>
        <div className="pa4 w-50 center">
        <button onClick={this.verifyWallet.bind(this)} disabled={this.state.isButtonDisabled}>Verify Wallet</button>
        </div>
        {this.state.errorMessage ? <div className="pa4 w-50 center">{this.state.errorMessage}</div>: null}
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