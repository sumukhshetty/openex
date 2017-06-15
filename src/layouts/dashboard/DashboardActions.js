import {firebaseRef} from './../../index.js'
import * as contractAbis from './../../contract_addresses/contractAbi'

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
        const _instance = ETHOrderBook.at(orderBookAddress)
        dispatch(setETHOrderBook(_instance))
      } else {
        dispatch(setETHOrderBook(null))
      }
    })
  },
}