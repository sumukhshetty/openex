import {firebaseRef} from './../../index.js'
import OrderBookFactory from './../../../contracts/abi/OrderBookFactory'
import factoryAddress from './../../contract_addresses/orderfactory.js'
import ETHOrderBookContract from './../../../contracts/abi/ETHOrderBook.json'
import * as contractAbis from './../../contract_addresses/contractAbi'
import {notify} from 'react-notify-toast'

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
  type: 'SET_ETH_ODER_BOOK',
  payload: orderBook
  }
}

function setTxHash(txHash){
  return {
    type: 'SET_TX_HASH',
    payload: txHash
  }
}

function clearTxHash(){
  return{
    type: 'CLEAR_TX_HASH'
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
    dispatch(sendEtherState('sending'));
    try {
      var coinbase = web3.eth.coinbase
      var event = orderBookFactory.data.ETHOrderBookCreated({seller:coinbase})
      event.watch((error, result) => {
        const ETHOrderBook = web3.eth.contract(contractAbis.ETHOrderBookAbi)
        const _instance = ETHOrderBook.at(result.args.orderAddress)

        firebaseRef.database().ref('/ethorderbook/'+user.profile.country+'/'+user.data.uid+'/orderBookAddress')
        .set(result.args.orderAddress)
        var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
              .push(tradeDetails, function(err){
                firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
                    newAdvertisement.key + '/tradetype').set('sell-ether')
              })
        event.stopWatching()
        dispatch(userOrderBook(_instance))
        dispatch(sendEtherState('init'))
        dispatch(clearTxHash())
      })

      orderBookFactory.data.createETHOrderBook(user.profile.country, {from: coinbase}, function(error, result){
        if(!error){
          dispatch(sendEtherState('waiting-for-tx-to-mine'));
          dispatch(setTxHash(result))
        } else {
          console.log(error)
        }
      })
    } catch (error) {
      console.log(error)
      notify.show("Please unlock your MetaMask account")
    }
  }
}

export function resetEtherState() {
  return function(dispatch) {
    dispatch(sendEtherState('init'));
  }
}
