import Web3 from 'web3'
import React, { Component } from 'react'
import ProductShortDescription from './ProductShortDescription'
import SignUpContainer from './../../signup/SignUpContainer'
import SignUpFormContainer from './../../user/ui/signupform/SignUpFormContainer'
import truffleConfig from './../../../truffle-config.js'

var web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`


class HomeMain extends Component {
  constructor(props){
    super(props)
    this.web3Provided;
    this.web3Initialize.bind(this)
  }

  componentWillMount(){
    this.web3Initialize()    
  }
  

  web3Initialize() {
      if (typeof web3 !== 'undefined') {                            
        // Use the Mist/wallet provider.     
        // DEVELOPER NOTE: removing the next commented line will break the app
        // eslint-disable-next-line
        this.web3Provided = new Web3(web3.currentProvider)
      } else {                                                      
        // DEVELOPER NOTE: What happens in the wild if the 
        // user does not have a browser based wallet? What happens
        // if the Web3 object cannot be initialized with the httpProvider
        // given from the loction in the truffle-config file?
        this.web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
      }
  }
  render() {
    console.log(this.web3Provided)
    var web3 = this.web3Provided
    return(
      <div className="pure-g">
        <div className="pure-u-2-3">
          <ProductShortDescription />
        </div>

        <div className="pure-u-1-3">
          <SignUpContainer web3={web3}/>
        </div>
      </div>
    )
  }
}

export default HomeMain;
