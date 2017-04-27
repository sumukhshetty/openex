// import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import BuyOrderContract from '../../../build/contracts/BuyOrder.json';
// import { browserHistory } from 'react-router'
// import factoryAddress from '../../contract_addresses/orderfactory.js'

const request = require('request')
const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'
import * as orderHelpers from './../../util/orderHelpers'

export const GET_BUY_ORDER = 'GET_BUY_ORDER';
function getBuyOrder (buyOrderPayload) {
  return {
    type: GET_BUY_ORDER,
    payload: buyOrderPayload
  };
}

module.exports = {
  clearBuyOrderState: () => (dispatch) => {
    dispatch({ type: 'CLEAR_BUY_ORDER'});
  },

  buyOrder: (orderId) => (dispatch) => {
    // firebaseRef.database().ref('buyorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/buyorders/' + orderId)
      .on('value', function (snapshot) {
        dispatch(getBuyOrder(snapshot.val()));
      });
  },

  fillEscrow: (contractAddress, orderId, sellerUid, web3) => (dispatch) => {
    console.log('fillEscrow');
    var coinbase = web3.eth.coinbase;
    const order = contract(BuyOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    order.at(contractAddress)
      .then(function (_order) {
        orderInstance = _order;
        return orderInstance.amount();
      })
      .then(function (amount) {
        console.log('amount:' + amount);
        console.log(contractAddress);
        var value = Number(amount) + Number(amount * 0.01);
        console.log(value); // TODO ak: this needs to grab the fee percentage from somewhere!!!
        web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function (err, address) {
          if (!err) {
            request({
                method: 'post',
                body: {
                  orderId: orderId,
                  sellerUid: sellerUid
                },
                json: true,
                url: 'https://us-central1-automteetherexchange.cloudfunctions.net/escrowFillled'
              },
              function(err, res, body) {
                if (err) {
                  console.error('error posting json: ', err)
                  throw err
                }
                if(res.statusCode === 500) {
                  console.error('Server responded with an error: ' + res.body.error);
                  throw res.body.error
                }
              });
          } else {
            console.log(err);
          }
        });
      });

    console.log('called fillEscrow [ActiveBuyOrderActions]');
  },

  paymentConfirmed: (orderId) => (dispatch) => {
    console.log('paymentConfirmed');
    firebaseRef.database().ref('/buyorders/' + orderId + '/status')
      .set('Payment Confirmed');
  },

  releaseEscrow: (contractAddress, orderId, web3, buyerUid, sellerUid) => (dispatch) => {
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
      console.log(txHash)
      request({
          method: 'post',
          body: {
            orderId: orderId,
            sellerUid: sellerUid,
            buyerUid: buyerUid
          },
          json: true,
          url: 'https://us-central1-automteetherexchange.cloudfunctions.net/etherReleased'
        },
        function(err, res, body) {
          if (err) {
            console.error('error posting json: ', err)
            throw err
          }
          if(res.statusCode === 500) {
            console.error('Server responded with an error: ' + res.body.error);
            throw res.body.error
          }
        });
      // firebaseRef.database().ref('/buyorders/' + orderId + '/status')
      // .set('Ether Released');

    }).then(function(){
      // TODO @qj catch the error if the index doesn't exist in firebase
      // orderHelpers.removeOrderFromActiveEscrows(buyerUid, orderId)
      // orderHelpers.removeOrderFromActiveEscrows(sellerUid, orderId)
      // orderHelpers.addOrderToCompletedTrades(buyerUid, orderId, 'buy-order')
      // orderHelpers.addOrderToCompletedTrades(sellerUid, orderId, 'buy-order')
    })
  }

};
