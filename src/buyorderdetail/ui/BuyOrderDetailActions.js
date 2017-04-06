import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'

export const GET_BUY_ORDER = 'GET_BUY_ORDER'
function getBuyOrder(buyOrderPayload) {
  return {
    type: GET_BUY_ORDER,
    payload: buyOrderPayload
  }
}

module.exports = {
  clearBuyOrderState: () => (dispatch) => {
    dispatch({ type: 'CLEAR_BUY_ORDER'});
  },
  buyOrder: (orderId) => (dispatch) => {
    firebaseRef.database().ref('orders')
    .orderByKey().equalTo(orderId)
      .on("value", function(snapshot){
        console.log('got buyorder by id');
        console.log(snapshot.val());
        dispatch(getBuyOrder(snapshot.val()[orderId]))
      })
  },

  createBuyOrderContract: (amount, buyerAddress, web3) => (dispatch) => {
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);
    var factoryInstance;
    var coinbase = web3.eth.coinbase;
    var block, orderAddress;
    console.log('amount');
    console.log(amount);
    console.log('buyerAddress');
    console.log(buyerAddress);


    factory.at(factoryAddress.factoryAddress)
    .then(function(_factory) {
      console.log('got factory contract');
      factoryInstance = _factory;
      return factoryInstance.createBuyOrder(buyerAddress, amount, {from: coinbase});
    })
    .then(function(txHash) {
      console.log('called factory.createBuyOrder');
      console.log(txHash);

      //TODO: update state of buyOrder in firebase
      //TODO: redirect to activetrade screen
    })
  }
}
