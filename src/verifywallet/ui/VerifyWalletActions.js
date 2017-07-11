/*// deprecate this
const contract = require('truffle-contract')
import ETHOrderBookContract from './../../../contracts/abi/ETHOrderBook.json'
import OrderBookFactoryContract from './../../../contracts/abi/OrderBookFactory.json'
import * as contractAbis from './../../contract_addresses/contractAbi'

function setWalletVerifiedStatus(verifiedBool){
  return {
    type: 'SET_BROWSER_WALLET_VERIFIED_STATUS',
    payload: verifiedBool
  }
}

function userOrderBook(orderBook) {
  return {
  type: 'USER_ETH_ORDER_BOOK',
  payload: orderBook
  }
}

function setOrderBookFactory(orderBookFactory) {
  return {
  type: 'ETH_ORDER_BOOK_FACTORY',
  payload: orderBookFactory
  }
}

function updateLoadingContractsStatus(status) {
  return {
    type: 'UPDATE_LOADING_CONTRACTS_STATUS',
    payload: status
  }
}

function wrongNetwork(wrongNetworkBool){
  console.log("wrongNetwork.GET_WRONG_NETWORK_STATUS")
  return {
    type: 'GET_WRONG_NETWORK_STATUS',
    payload: wrongNetworkBool
  }
}

module.exports = {
  verifyWallet: (result) => (dispatch) => {
    dispatch(setWalletVerifiedStatus(result))
  },
  loadUserOrderBook: (web3, orderBookAddress) => (dispatch) => {
    dispatch(userOrderBook('obtaining...'))
    try {
      const ETHOrderBook = web3.eth.contract(contractAbis.ETHOrderBookAbi)
      const _instance = ETHOrderBook.at(orderBookAddress)
      dispatch(userOrderBook(_instance))
      dispatch(updateLoadingContractsStatus('loaded'))

    } catch(error) {
      console.log("ui.VerifyWalletActions.verifyWallet.loadUserOrderBook.error")
      console.log(error)
      dispatch(userOrderBook(null))
    }
  },
  loadOrderBookFactory: (web3, orderBookFactoryAddress) => (dispatch) => {
    dispatch(setOrderBookFactory('obtaining...'))
    try {
      const OrderBookFactory = web3.eth.contract(contractAbis.OrderBookFactoryAbi)
      const _orderBookFactory = OrderBookFactory.at(orderBookFactoryAddress)
      dispatch(setOrderBookFactory(_orderBookFactory))
      dispatch(updateLoadingContractsStatus('loaded'))

    } catch(error) {
      console.log('ui.VerifyWalletActions.loadOrderBookFactory.catch')
      console.log(error)
      dispatch(setOrderBookFactory(null))
    }
  },
  wrongNetwork: (value)=>(dispatch)=>{
    dispatch(wrongNetwork(value))
  }
}*/