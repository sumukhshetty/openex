import Web3 from 'web3'

import truffleConfig from './../../truffle-config.js'

var web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`

export const WEB_3_INITIALIZE = 'WEB_3_INITIALIZE'
function web3Init(web3) {
  return {
  type:WEB_3_INITIALIZE,
  payload:web3 
  }
}

function browserBasedWalletLocked(lockedBool){
  return {
    type: 'GET_BROWSER_WALLET_LOCK_STATUS',
    payload: lockedBool
  }
}

function wrongNetwork(wrongNetworkBool){
  return {
    type: 'GET_WRONG_NETWORK_STATUS',
    payload: wrongNetworkBool
  }
}

export function web3Initialize() {
  return function(dispatch) {
    var web3Provided;
    if (typeof web3 !== 'undefined') {                            
      // Use the Mist/wallet provider.     
      // DEVELOPER NOTE: removing the next commented line will break the app
      // eslint-disable-next-line
      web3Provided = new Web3(web3.currentProvider)
      if (web3Provided.eth.accounts.length === 0){
        dispatch(browserBasedWalletLocked(true))
      } else {
        dispatch(browserBasedWalletLocked(false))
      }
      web3Provided.version.getNetwork((err, res)=> {
        // ISSUE - Change this to the mainnet
        if(err){
          console.log(err)
        }
        if(res !== '4'){
          dispatch(wrongNetwork(true))
        } else{
          dispatch(wrongNetwork(false))
        }
      })
    } else {                                                      
      // DEVELOPER NOTE: What happens in the wild if the 
      // user does not have a browser based wallet? What happens
      // if the Web3 object cannot be initialized with the httpProvider
      // given from the loction in the truffle-config file?
      web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
    }
    dispatch(web3Init(web3Provided))

  }
}