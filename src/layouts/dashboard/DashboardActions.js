import {firebaseRef} from './../../index.js'
import * as contractAbis from './../../contract_addresses/contractAbi'
import {notify} from 'react-notify-toast'

function setSellerInterfaceFactory(sellerInterfaceFactory) {
  return {
  type: 'SELLER_INTERFACE_FACTORY',
  payload: sellerInterfaceFactory
  }
}

function setOrderDB(orderDB) {
  return {
  type: 'ORDERDB',
  payload: orderDB
  }
}

function setOrderBook(orderBook) {
  return {
  type: 'ORDERBOOK',
  payload: orderBook
  }
}

function setSellerInterface(sellerInterface) {
  return {
  type: 'SET_SELLER_INTERFACE',
  payload: sellerInterface
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
  loadSellerInterfaceFactory: (web3, sellerInterfaceFactoryAddress) => (dispatch) => {
    console.log('DashboardActions.loadSellerInterfaceFactory')
    dispatch(setSellerInterfaceFactory('obtaining...'))
    try {
      const SellerInterfaceFactory = web3.eth.contract(contractAbis.SellerInterfaceFactoryAbi)
      const _sellerInterfaceFactory = SellerInterfaceFactory.at(sellerInterfaceFactoryAddress)
      dispatch(setSellerInterfaceFactory(_sellerInterfaceFactory))

    } catch(error) {
      console.log('ui.VerifyWalletActions.loadSellerInterfaceFactory.catch')
      console.log(error)
      dispatch(setSellerInterfaceFactory(null))
    }
  },
  loadSellerInterface: (web3, user) => (dispatch) => {
    console.log('DashboardActions.loadSellerInterface')
    dispatch(setSellerInterface('obtaining...'))
    firebaseRef.database().ref('/sellerInterface/'+user.profile.country+'/'+user.data.uid).once('value', function(snap){
      var sellerInterfaceAddress = snap.val()
      if(sellerInterfaceAddress) {
        const SellerInterface = web3.eth.contract(contractAbis.SellerInterfaceAbi)
        const _instance = SellerInterface.at(sellerInterfaceAddress.sellerInterfaceAddress)
        dispatch(setSellerInterface(_instance))
      } else {
        dispatch(setSellerInterface(null))
      }
    })
  },
  loadOrderDB: (web3, orderDBAddress) => (dispatch) => {
    console.log('DashboardActions.loadOrderDB')
    dispatch(setOrderDB('obtaining...'))
    try {
      const OrderDB = web3.eth.contract(contractAbis.OrderDB)
      const _orderDB = OrderDB.at(orderDBAddress)
      dispatch(setOrderDB(_orderDB))

    } catch(error) {
      console.log('ui.VerifyWalletActions.loadOrderDB.catch')
      console.log(error)
      dispatch(setOrderDB(null))
    }
  },
  loadOrderBook: (web3, orderBookAddress) => (dispatch) => {
    console.log('DashboardActions.loadOrderBook')
    dispatch(setOrderBook('obtaining...'))
    try {
      const OrderBook = web3.eth.contract(contractAbis.OrderBook)
      const _orderBook = OrderBook.at(orderBookAddress)
      dispatch(setOrderBook(_orderBook))

    } catch(error) {
      console.log('ui.VerifyWalletActions.loadOrderDB.catch')
      console.log(error)
      dispatch(setOrderDB(null))
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
