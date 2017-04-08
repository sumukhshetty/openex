import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import BuyOrderContract from '../../../build/contracts/BuyOrder.json'
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
    // firebaseRef.database().ref('buyorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/buyorders/' + orderId)
      .on("value", function(snapshot) {
        dispatch(getBuyOrder(snapshot.val()))
      })
  },

  fillEscrow: (contractAddress, orderId, web3) => (dispatch) => {
    console.log("fillEscrow")
    var coinbase = web3.eth.coinbase;

    web3.eth.sendTransaction({from: coinbase, to: contractAddress})
    .then(function(txHash) {
      firebaseRef.database().ref('/buyorders/' + orderId + '/status')
      .set('In Escrow');
    })
    console.log('called fillEscrow [ActiveBuyOrderActions]');
  },

  releaseEscrow: (contractAddress, orderId, web3) => (dispatch) => {
    console.log("releasEther");
    const order = contract(BuyOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    var coinbase = web3.eth.coinbase;

    order.at(contractAddress)
    .then(function(_order) {
      orderInstance = _order;
      return orderInstance.payoutToBuyer({from: coinbase});
    })
    .then(function(txHash) {
      firebaseRef.database().ref('/buyorders/' + orderId + '/status')
      .set('Ether Released');
    })
  },

  paymentConfirmed: (orderId) => (dispatch) => {
    console.log('paymentConfirmed');
    firebaseRef.database().ref('/buyorders/' + orderId + '/status')
    .set('Payment Confirmed');
  }


}
