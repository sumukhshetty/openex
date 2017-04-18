import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')

import {firebaseRef} from './../../index.js'

export const POST_TRADE = 'POST_TRADE'
function tradeCreated(tradePayload) {
  return {
    type: POST_TRADE,
    payload: tradePayload
  }
}

export function postTrade(postTradeDetails, web3, state) {
  return function(dispatch) {
    // Using truffle-contract we create the authentication object.
    // TODO check what kind of trade is being made and either get the contract
    // or make an entry in the firebase db
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);

    const directory = contract(ContractDirectoryContract);
    directory.setProvider(web3.currentProvider);

    // Declaring this for later so we can chain functions on Authentication.
    var factoryInstance;

    // Get current ethereum wallet. TODO: Wrap in try/catch.
    var coinbase = web3.eth.coinbase;
    var block, orderAddress;

    factory.at(factoryAddress.factoryAddress)
    .then(function(_factory) {
      console.log('got factory contract');
      factoryInstance = _factory;
      return factoryInstance.createSellOrder({from: coinbase});
    })
    .then(function(txHash) {
      var currentdate = new Date().toString()
      var newOrder = firebaseRef.database().ref("sellorders/").push(postTradeDetails);
      firebaseRef.database().ref("sellorders/"+newOrder.key+'/orderId').set(newOrder.key);
      firebaseRef.database().ref("users/"+state.user.data.uid+"/advertisements/").child(newOrder.key).set({tradeType: postTradeDetails.tradeType})
      firebaseRef.database().ref('/sellorders/' + newOrder.key + '/contractTx')
      .set(txHash['tx']);
      firebaseRef.database().ref('/sellorders/' + newOrder.key + '/contractAddress')
      .set(txHash['logs'][0]['args']['orderAddress']);
      dispatch(tradeCreated(postTradeDetails))
      browserHistory.push('/dashboard')
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}


export function buyEtherPostTrade(postTradeDetails, web3, state) {
  return function(dispatch){
    var newOrder = firebaseRef.database().ref("buyorders/").push(postTradeDetails);
    firebaseRef.database().ref("buyorders/"+newOrder.key+'/orderId').set(newOrder.key);
    firebaseRef.database().ref("users/"+state.user.data.uid).child('advertisements').child(newOrder.key).set({tradeType: postTradeDetails.tradeType})
    dispatch(tradeCreated(postTradeDetails))
    browserHistory.push('/dashboard')
  }
}
