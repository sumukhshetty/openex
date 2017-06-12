import {firebaseRef} from './../../index.js'
import OrderBookFactory from './../../../contracts/abi/OrderBookFactory'
import factoryAddress from './../../contract_addresses/orderfactory.js'
import ETHOrderBookContract from './../../../contracts/abi/ETHOrderBook.json'

const contract = require('truffle-contract')
// New
export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

function userOrderBook(orderBook) {
  return {
  type: 'USER_ETH_ORDER_BOOK',
  payload: orderBook
  }
}

function updateLoadingContractsStatus(status) {
  return {
    type: 'UPDATE_LOADING_CONTRACTS_STATUS',
    payload: status
  }
}

export function userCreatesBuyTradeAdvertisement(tradeDetails, web3, user){
  return function(dispatch){
    var newAdvertisement = firebaseRef.database().ref('/buytradeadvertisements/'+ user.profile.country)
      .push(tradeDetails, function(error){
        firebaseRef.database().ref('/users/' + user.data.uid + '/advertisements/buyether/' + 
          newAdvertisement.key + '/tradetype').set('buy-ether')
      })
  }
}

export function userCreatesSellTradeAdvertisement(tradeDetails, web3, orderBookFactory, user){
  return function(dispatch){
    console.log("PostTradeFormActions.userCreatesSellTradeAdvertisement")
    dispatch(sendEtherState('sending'));
    try {
      orderBookFactory.data.createETHOrderBook(user.profile.country, {from:web3.eth.coinbase})
        .then(function(txHash){
          console.log(txHash)
          console.log('created the ETHOrderBookContract')
          loadUserOrderBook(web3, txHash['logs'][0]['args']['orderAddress'])
          firebaseRef.database().ref('/users/'+user.data.uid+'/orderBookAddress')
          .set(txHash['logs'][0]['args']['orderAddress'])
          var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
            .push(tradeDetails, function(err){
              firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
                  newAdvertisement.key + '/tradetype').set('sell-ether')
            })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function resetEtherState() {
  return function(dispatch) {
    dispatch(sendEtherState('init'));
  }
}

export function loadUserOrderBook(web3, orderBookAddress) {
  return function(dispatch){
    dispatch(userOrderBook('obtaining...'))
    try {
      const orderBook = contract(ETHOrderBookContract);
      orderBook.setProvider(web3.currentProvider);
      var orderBookInstance;
      orderBook.at(orderBookAddress)
        .then(function (_orderBook) {
          dispatch(userOrderBook(_orderBook))
          dispatch(updateLoadingContractsStatus('loaded'))
        })
    } catch(error) {
      console.log("ui.VerifyWalletActions.verifyWallet.loadUserOrderBook.error")
      console.log(error)
      dispatch(userOrderBook(null))
    }
  }
  }