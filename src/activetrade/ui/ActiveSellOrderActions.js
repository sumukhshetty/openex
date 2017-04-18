// import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import SellOrderContract from '../../../build/contracts/SellOrder.json';
// import { browserHistory } from 'react-router'
// import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'
import * as orderHelpers from './../../util/orderHelpers'

export const GET_SELL_ORDER = 'GET_SELL_ORDER';
function getSellOrder (sellOrderPayload) {
  return {
    type: GET_SELL_ORDER,
    payload: sellOrderPayload
  };
}

module.exports = {
  clearSellOrderState: () => (dispatch) => {
    dispatch({ type: 'CLEAR_BUY_ORDER'});
  },

  sellOrder: (requestId) => (dispatch) => {
    // firebaseRef.database().ref('sellorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/purchaserequests/' + requestId)
      .on('value', function (snapshot) {
        dispatch(getSellOrder(snapshot.val()));
      });
  },

  confirmTradeAction: (contractAddress, buyerAddress, requestId, amount, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    const order = contract(SellOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    order.at(contractAddress)
      .then(function (_order) {
        orderInstance = _order;
        return orderInstance.addOrder(buyerAddress, web3.toWei(amount, 'ether'), {from: coinbase});
      })
      .then(function() {
        firebaseRef.database().ref('/purchaserequests/' + requestId +'/status')
        .set('Awaiting Payment');
      })
      .catch(function(error) {
        console.log('error in confirmTradeAction [ActiveSellOrderActions]');
        console.log(error);
      })
  },

  confirmPaymentAction: (requestId) => (dispatch) => {
    firebaseRef.database().ref('/purchaserequests/' + requestId +'/status')
    .set('Awaiting Release');
  },

  releaseEtherAction: (contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    const order = contract(SellOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    order.at(contractAddress)
      .then(function (_order) {
        orderInstance = _order;
        return orderInstance.completeOrder(buyerAddress, {from: coinbase});
      })
      .then(function (txHash) {
        firebaseRef.database().ref('/purchaserequests/' + requestId +'/status')
        .set('All Done')
        .then(function() {
          orderHelpers.removeOrderFromActiveEscrows(buyerUid, requestId)
          orderHelpers.removeOrderFromActiveEscrows(sellerUid, requestId)
          orderHelpers.addOrderToCompletedTrades(buyerUid, requestId, 'sell-ether')
          orderHelpers.addOrderToCompletedTrades(sellerUid, requestId, 'sell-ether')
          // firebaseRef.database().ref('/purchaserequests/' + requestId)
          // .once('value', function(snapshot) {
          //
          //   let orderId = firebaseRef.database().ref('/completedOrders').push(snapshot.val());
          //   firebaseRef.database().ref('/purchaserequests/' + requestId).remove();
          //   firebaseRef.database.ref('/users/'+snapshot.val()['buyerUid']+'/completedOrders/'+orderId.key)
          //   .set({tradeType: 'sell-ether'});
          //   firebaseRef.database.ref('/users/'+snapshot.val()['buyerUid']+'/activeTrades/'+requestId)
          //   .remove();
          //   firebaseRef.database.ref('/users/'+snapshot.val()['sellerUid']+'/completedOrders/'+orderId.key)
          //   .set({tradeType: 'sell-ether'});
          //   firebaseRef.database.ref('/users/'+snapshot.val()['sellerUid']+'/activeTrades/'+requestId)
          //   .remove();
          // })
        });
      })
      .catch(function (error) {
        console.log('error in releaseEtherAction [ActiveSellOrderActions]');
        console.log(error);
      })
  }

};
