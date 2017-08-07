import {firebaseRef} from './../../index.js'
import * as contractAbis from './../../contract_addresses/contractAbi'
import {notify} from 'react-notify-toast'

function setExchange(exchange) {
  return {
  type: 'EXCHANGE',
  payload: exchange
  }
}

function userAccountCorrect(value){
  return{
    type: 'UPDATE_CORRECT_USER_ACCOUNT',
    payload: value
  }
}

function setLockedWalletStatus(value){
  return {
    type: 'SET_BROWSER_WALLET_LOCK_STATUS',
    payload: value
  }
}

module.exports = {
  loadExchange: (web3, exchangeAddress) => (dispatch) => {
    console.log('DashboardActions.loadExchange')
    dispatch(setExchange('obtaining...'))
    try {
      const Exchange = web3.eth.contract(contractAbis.EZEtherMarketplace)
      const exchange = Exchange.at(exchangeAddress)
      dispatch(setExchange(exchange))

    } catch(error) {
      console.log('DashboardActions.loadExchange.catch')
      console.log(error)
      dispatch(setExchange(null))
    }
  },
  checkBrowserWalletAddress:(web3, user) => (dispatch) =>{
    console.log('DashboardActions.checkBrowserWalletAddress')
    console.log(web3)
    try{
      if(web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Wallet Address Undefined")
      }
      if(user.data.uid === coinbase){
        dispatch(userAccountCorrect(true))
      } else {
        dispatch(userAccountCorrect(false))
      }
    } catch(error){
      console.log("checkBrowserWalletAddress.error")
      console.log(error)
      dispatch(setLockedWalletStatus(true))
      if (error.message === 'Wallet Address Undefined') {
        notify.show("Please unlock your MetaMask account")
      }
    }
  }
}
