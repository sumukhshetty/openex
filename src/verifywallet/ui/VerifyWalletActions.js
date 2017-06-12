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

module.exports = {
  verifyWallet: (result) => (dispatch) => {
    dispatch(setWalletVerifiedStatus(result))
  },
  loadUserOrderBook: (web3, orderBookAddress) => (dispatch) => {
    console.log("VerifyWalletActions.loadUserOrderBook")
    dispatch(userOrderBook('obtaining...'))
    try {
      console.log(new Date())
      const ETHOrderBook = web3.eth.contract(contractAbis.ETHOrderBookAbi)
      console.log(ETHOrderBook)
      const _instance = ETHOrderBook.at(orderBookAddress)
      console.log(_instance)
      dispatch(userOrderBook(_instance))
      dispatch(updateLoadingContractsStatus('loaded'))
      console.log(new Date())
      /*const orderBook = contract(ETHOrderBookContract);
      orderBook.setProvider(web3.currentProvider);
      var orderBookInstance;
      orderBook.at(orderBookAddress)
        .then(function (_orderBook) {
          dispatch(userOrderBook(_orderBook))
          dispatch(updateLoadingContractsStatus('loaded'))
        })*/
    } catch(error) {
      console.log("ui.VerifyWalletActions.verifyWallet.loadUserOrderBook.error")
      console.log(error)
      dispatch(userOrderBook(null))
    }
  },
  loadOrderBookFactory: (web3, orderBookFactoryAddress) => (dispatch) => {
    console.log("loadOrderBookFactory")
    console.log(contractAbis.OrderBookFactoryAbi)
    console.log(orderBookFactoryAddress)
    dispatch(setOrderBookFactory('obtaining...'))
    try {
      const OrderBookFactory = web3.eth.contract(contractAbis.OrderBookFactoryAbi)
      console.log(OrderBookFactory)
      const _orderBookFactory = OrderBookFactory.at(orderBookFactoryAddress)
      console.log(_orderBookFactory)
      dispatch(setOrderBookFactory(_orderBookFactory))
      dispatch(updateLoadingContractsStatus('loaded'))
      /*const orderBookFactory = contract(OrderBookFactoryContract)
      orderBookFactory.setProvider(web3.currentProvider)
      orderBookFactory.at(orderBookFactoryAddress)
        .then(function(_orderBookFactory){
          dispatch(setOrderBookFactory(_orderBookFactory))
          dispatch(updateLoadingContractsStatus('loaded'))
        })*/
    } catch(error) {
      console.log('ui.VerifyWalletActions.loadOrderBookFactory.catch')
      console.log(error)
      dispatch(setOrderBookFactory(null))
    }
  }
}