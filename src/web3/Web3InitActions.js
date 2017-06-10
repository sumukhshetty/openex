import Web3 from 'web3'

import truffleConfig from './../../truffle-config.js'

var web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`

import {firebaseRef} from './../index.js'
import OrderBookFactoryContract from '../../contracts/abi/OrderBookFactory.json'
import factoryAddress from '../contract_addresses/orderfactory.js'
const contract = require('truffle-contract')

export const WEB_3_INITIALIZE = 'WEB_3_INITIALIZE'
function web3Init(web3) {
  return {
  type:WEB_3_INITIALIZE,
  payload:web3
  }
}

export const ORDER_BOOK_FACTORY = 'ORDER_BOOK_FACTORY'
function orderBookFactory(factory) {
  return {
  type:ORDER_BOOK_FACTORY,
  payload:factory
  }
}

function browserBasedWalletLocked(lockedBool){
  return {
    type: 'SET_BROWSER_WALLET_LOCK_STATUS',
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
  console.log("web3Initialize")
  return function(dispatch) {
    var web3Provided;
    if (typeof web3 !== 'undefined') {
      // Use the Mist/wallet provider.
      // DEVELOPER NOTE: removing the next commented line will break the app
      // eslint-disable-next-line
      web3Provided = new Web3(web3.currentProvider)
      if (web3Provided.eth.accounts.length === 0){
        console.log("the account is locked")
        dispatch(browserBasedWalletLocked(true))
      } else {
        console.log("the account is not locked")
        dispatch(browserBasedWalletLocked(false))
      }
      // ISSUE - Change this to the mainnet
      try {
        if(web3Provided.version.network === '42'){
          dispatch(wrongNetwork(false))
        } else {
          dispatch(wrongNetwork(true))
        }        
      } catch (error) {
        console.log("we got an error getting the network")
        //dispatch(wrongNetwork(false))
      }
      
    } else {

      web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
    }
    dispatch(web3Init(web3Provided))
  }
}

export function createETHOrderBook(web3, orderBookFactory, uid, country) {
  return function(dispatch) {
    let coinbase = web3.eth.coinbase;

    const factory = contract(OrderBookFactoryContract);
    factory.setProvider(web3.currentProvider);
    var factoryInstance;
    console.log('coinbase:' + coinbase);
    console.log('address: ' + factoryAddress.factoryAddress);
    factory.at(factoryAddress.factoryAddress)
    .then(function (_factory) {
      _factory.createETHOrderBook(country, {from: coinbase})
      .then(function(txHash) {
        //TODO: call function that checks web3 and then updates DB
        firebaseRef.database().ref('/users/' + uid + '/orderBookAddress')
        .set(txHash['logs'][0]['args']['orderAddress']);
      })
    })
    .catch(function (error) {
      console.log(error);
    })

  }
}
