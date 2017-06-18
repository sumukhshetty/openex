import {firebaseRef} from './../../index.js'
import * as contractAbis from './../../contract_addresses/contractAbi'
import {notify} from 'react-notify-toast'

function setOrderBookFactory(orderBookFactory) {
  return {
  type: 'ETH_ORDER_BOOK_FACTORY',
  payload: orderBookFactory
  }
}

function setETHOrderBook(orderBook) {
  return {
  type: 'SET_ETH_ORDER_BOOK',
  payload: orderBook
  }
}

function userAccountCorrect(value){
  console.log('userAccountCorrect.UPDATE_CORRECT_USER_ACCOUNT')
  console.log(value)
  return{
    type: 'UPDATE_CORRECT_USER_ACCOUNT',
    payload: value
  }
}

module.exports = {
  loadOrderBookFactory: (web3, orderBookFactoryAddress) => (dispatch) => {
    dispatch(setOrderBookFactory('obtaining...'))
    try {
      const OrderBookFactory = web3.eth.contract(contractAbis.OrderBookFactoryAbi)
      const _orderBookFactory = OrderBookFactory.at(orderBookFactoryAddress)
      dispatch(setOrderBookFactory(_orderBookFactory))

    } catch(error) {
      console.log('ui.VerifyWalletActions.loadOrderBookFactory.catch')
      console.log(error)
      dispatch(setOrderBookFactory(null))
    }
  },
  loadETHOrderBook: (web3, user) => (dispatch) => {
    dispatch(setETHOrderBook('obtaining...'))
    firebaseRef.database().ref('/ethorderbook/'+user.profile.country+'/'+user.data.uid).once('value', function(snap){
      var orderBookAddress = snap.val()
      if(orderBookAddress) {
        const ETHOrderBook = web3.eth.contract(contractAbis.ETHOrderBookAbi)
        const _instance = ETHOrderBook.at(orderBookAddress.orderBookAddress)
        dispatch(setETHOrderBook(_instance))
      } else {
        dispatch(setETHOrderBook(null))
      }
    })
  },
  checkBrowserWalletAddress:(web3, user) => (dispatch) =>{
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
      if (error.message === 'Wallet Address Undefined') {
        notify.show("Please unlock your MetaMask account")
      }
    }
  }
}