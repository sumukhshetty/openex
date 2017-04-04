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
      return web3.eth.getBlockNumber();
    })
    .then(function(_block) {
      console.log('got bloc');
      block = _block;
      //SellOrder
      if(postTradeDetails.tradeType === "sell-ether") {
        return factoryInstance.createSellOrder({from: coinbase});
      } else {
        return factoryInstance.createBuyOrder(postTradeDetails.buyerAddress, postTradeDetails.amount, {from: web3.eth.coinbase});
      }
    })
    .then(function(txHash) {
      console.log('called factory');
      console.log(txHash);
      // let orderType = (postTradeDetails.tradeType === "sell-ether") ? "sell" : "buy";
      // return new Promise(function(resolve, reject) {
      // var orderCreatedEvent = factoryInstance.OrderCreated({seller: web3.eth.coinbase, orderType: web3.sha3(orderType)},{fromBlock: block, toBlock: 'pending'});
      //   orderCreatedEvent.watch(function(error, result) {
      //     if(error) {
      //       console.log(error);
      //     }
      //     console.log(result.args);
      //     if(result.args.orderAddress) {
      //       orderAddress = result.args.orderAddress;
      //       orderCreatedEvent.stopWatching();
      //       resolve();
      //     }
      //   })});

      //add orderAddress to the list of this user's orders.
      console.log(orderAddress);
      console.log("event was fired?")

      var currentdate = new Date().toString()
      dispatch(tradeCreated(postTradeDetails))
      browserHistory.push('/orderslist')

    })
    .then(function() {
      //add orderAddress to the list of this user's orders.
      console.log(orderAddress);
      console.log("event was fired?")

      var currentdate = new Date().toString()
      firebaseRef.database().ref("sellorders/" + state.user.data.uid + '/' + postTradeDetails.orderId).set(postTradeDetails);
      dispatch(tradeCreated(postTradeDetails))
      browserHistory.push('/orderslist')
    })
    .catch(function (error) {
      console.log(error);

    })
  }
}


export function buyEtherPostTrade(postTradeDetails, web3, state) {
  return function(dispatch){
    console.log(postTradeDetails)
    console.log("buyorders/" + state.user.data.uid + '/' + postTradeDetails.orderId)
    firebaseRef.database().ref("buyorders/" + state.user.data.uid + '/' + postTradeDetails.orderId).set(postTradeDetails);
    dispatch(tradeCreated(postTradeDetails))
    browserHistory.push('/orderslist')
  }
}
