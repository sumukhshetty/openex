import SellOrderContract from '../../../build/contracts/SellOrder.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'

export const GET_SELL_ORDER = 'GET_SELL_ORDER'
function getSellOrder(sellOrderPayload) {
  return {
    type: GET_SELL_ORDER,
    payload: sellOrderPayload
  }
}

export const GET_SELL_ORDER_CONTRACT = 'GET_SELL_ORDER_CONTRACT'
function getOrderInfo(sellOrderPayload) {
  return {
    type: GET_SELL_ORDER_CONTRACT,
    payload: sellOrderPayload
  }
}

module.exports = {
  clearSellOrderState: () => (dispatch) => {
    dispatch({ type: 'CLEAR_BUY_ORDER'});
  },

  sellOrder: (orderId, web3) => (dispatch) => {
    var orderInfo = {};
    const order = contract(SellOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    var coinbase = web3.eth.coinbase;
    firebaseRef.database().ref('/sellorders/' + orderId)
      .once("value", function(snapshot){
        console.log('got sellorder by id');
        console.log(snapshot.val());
        dispatch(getSellOrder(snapshot.val()));
        return snapshot;
      })
      .then(function(snapshot) {
        console.log('after returning address');
        return order.at(snapshot.val()['contractAddress']);
      })
      .then(function(_order) {
        orderInstance = _order;
        return orderInstance.availableFunds();
      })
      .then(function(availableFunds) {
        orderInfo['availableFunds'] = availableFunds;
        dispatch(getOrderInfo(orderInfo))
      })
  },

  requestEtherFromSeller: (amount, uid, orderId) => (dispatch) => {
    firebaseRef.database().ref('/sellorders/' + orderId + '/requests/' + uid)
    .set({
      amount: amount
    })
  }


}
