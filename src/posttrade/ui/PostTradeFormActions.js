import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
import SellOrderContract from '../../../build/contracts/SellOrder.json'
import BuyOrderContract from '../../../build/contracts/BuyOrder.json'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const POST_TRADE = 'POST_TRADE'
function tradeCreated(tradePayload) {
  return {
    type: POST_TRADE,
    payload: tradePayload
  }
}

export function postTrade(postTradeDetails, web3) {
  console.log(postTradeDetails);
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
    var gasCost;

    // Get current ethereum wallet. TODO: Wrap in try/catch.
    var coinbase = web3.eth.coinbase;
    console.log("ok lets go get this")
    var block, orderAddress;

    directory.deployed()
    .then(function(_directory) {
      return _directory.orderFactoryAddress();
    })
    .then(function(_orderFactoryAddress) {
      return factory.at(_orderFactoryAddress);
    })
    .then(function(_factory) {
      factoryInstance = _factory;
      return web3.eth.getBlockNumber();
    })
    .then(function(_block) {
      block = _block;
      //SellOrder
      if(postTradeDetails.tradeType === "sell-ether") {
        return factoryInstance.createSellOrder({from: web3.eth.coinbase});
      } else {
        return factoryInstance.createBuyOrder(postTradeDetails.buyerAddress, postTradeDetails.amount, {from: web3.eth.coinbase});
      }
    })
    .then(function(txHash) {
      console.log(txHash);
      //return browserHistory.push('/dashboard');
      console.log(postTradeDetails.tradeType);
      if(postTradeDetails.tradeType === "sell-ether") {
        return new Promise(function(resolve, reject) {
        var sellOrderCreatedEvent = factoryInstance.SellOrderCreated({seller: web3.eth.coinbase},{fromBlock: block, toBlock: 'pending'});
          sellOrderCreatedEvent.watch(function(error, result) {
            if(error) {
              console.log(error);
            }
            orderAddress = result.args.orderAddress;
            sellOrderCreatedEvent.stopWatching();
            resolve();
          })});
      } else {
        var buyOrderCreatedEvent = factoryInstance.BuyOrderCreated({seller: web3.eth.coinbase},{fromBlock: block, toBlock: 'latest'});
        return new Promise(function(resolve, reject) {
          buyOrderCreatedEvent.watch(function(error, result) {
            if(error) {
              console.log(error);
            }
            orderAddress = result.args.orderAddress;
            buyOrderCreatedEvent.stopWatching();
            resolve();
          })});
      }
    }).then(function() {
      //add orderAddress to the list of this user's orders.
      console.log(orderAddress);
      console.log("event was fired?")
    })





  }
}
