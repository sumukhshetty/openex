// import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import BuyOrderContract from '../../../build/contracts/BuyOrder.json';
import { browserHistory } from 'react-router'
// import factoryAddress from '../../contract_addresses/orderfactory.js'

const request = require('request')
const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'
//import * as orderHelpers from './../../util/orderHelpers'

export const GET_BUY_ORDER = 'GET_BUY_ORDER';
function getBuyOrder (buyOrderPayload) {
  return {
    type: GET_BUY_ORDER,
    payload: buyOrderPayload
  };
}

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

export const CANCEL_TRADE_STATE = 'CANCEL_TRADE_STATE'
function cancelTradeState(cancelStatePayload) {
  return {
    type: CANCEL_TRADE_STATE,
    payload: cancelStatePayload
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
      .on('value', function (snapshot) {
        dispatch(getBuyOrder(snapshot.val()));
      });
  },

  fillEscrow: (buyOrder, contractAddress, orderId, sellerUid, web3) => (dispatch) => {
    console.log('fillEscrow');
    dispatch(sendEtherState('sending'));
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
        var value = Number(amount) + Number(amount * 0.1);
        console.log(value); // TODO ak: this needs to grab the fee percentage from somewhere!!!
        web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function (err, address) {
          if (!err) {
            firebaseRef.database().ref('/users/'+ buyOrder.buyerUid + '/fcmToken/').once("value", function(snap){
              var fcmToken = snap.val()
              request({
                  method: 'post',
                  body: {
                    orderId: orderId,
                    sellerUid: sellerUid,
                    sellerUsername: buyOrder.sellerUsername,
                    buyerFcmToken: fcmToken
                  },
                  json: true,
                  url: 'https://us-central1-automteetherexchange.cloudfunctions.net/escrowFillled'
                },
                function(err, res, body) {
                  if (err) {
                    console.error('error posting json: ', err)
                    throw err
                  }
                  if(res.statusCode === 200) {
                    // DESIGNER NOTE: Is this the best place to send the user to, maybe some kind of confirmation screen
                    console.log("fillEscrow.200")
                  }
                  if(res.statusCode === 500) {
                    console.error('Server responded with an error: ' + res.body.error);
                    throw res.body.error
                  }
                });
            }
            )
          } else {
            dispatch(sendEtherState('init'));
            console.log(err);
          }
        });
      });

    console.log('called fillEscrow [ActiveBuyOrderActions]');
  },

  resetEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  },

  resetCancelState: () => (dispatch) => {
    dispatch(cancelTradeState('init'));
  },

  setCancelState: () => (dispatch) => {
    dispatch(cancelTradeState('cancelling'));
  },

  paymentConfirmed: (buyOrder, orderId) => (dispatch) => {
    console.log('paymentConfirmed');
    firebaseRef.database().ref('/users/'+ buyOrder.sellerUid + '/fcmToken/').once("value", function(snap){
      var fcmToken = snap.val()
      var postData = {
        sellerFcmToken: fcmToken,
        buyerUsername: buyOrder.buyerUsername
      }
      var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/confirmPayment'
      request({
        method:'post',
        body:{postData:postData},
        json:true,
        url: url
      },
      function(err, res, body){
        if (err) {
          console.error('error posting json: ', err)
          throw err
        }
        if(res.statusCode === 200) {
          // DESIGNER NOTE: Is this the best place to send the user to, maybe some kind of confirmation screen
          console.log("paymentConfirmed.200")
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
        }
      })
    })
    firebaseRef.database().ref('/buyorders/' + orderId + '/status')
      .set('Payment Confirmed');
  },

  releaseEscrow: (buyOrder, contractAddress, orderId, web3, buyerUid, sellerUid,) => (dispatch) => {
    console.log("releasEther");
    dispatch(sendEtherState('sending'));
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
      firebaseRef.database().ref('/users/'+ buyOrder.buyerUid + '/fcmToken/').once("value", function(snap){
        var fcmToken = snap.val()
        request({
            method: 'post',
            body: {
              orderId: orderId,
              sellerUid: sellerUid,
              buyerUid: buyerUid,
              buyerFcmToken: fcmToken,
              sellerUsername: buyOrder.sellerUsername
            },
            json: true,
            url: 'https://us-central1-automteetherexchange.cloudfunctions.net/etherReleased'
          },
          function(err, res, body) {
            if (err) {
              console.error('error posting json: ', err)
              throw err
            }
            if(res.statusCode === 200) {
              // DESIGNER NOTE: Is this the best place to send the user to, maybe some kind of confirmation screen
              console.log("releaseEscrow.200")
            }
            if(res.statusCode === 500) {
              console.error('Server responded with an error: ' + res.body.error);
              throw res.body.error
            }
          });
      })
    })
    .catch(function(err){
      dispatch(sendEtherState('init'));
      console.log(err);
    })
  },

  cancelTrade: (orderId, uid) => (dispatch) => {
    dispatch(cancelTradeState('confirmed'));
    firebaseRef.database().ref('/buyorders/' + orderId + '/cancelled')
    .set(uid)
    .then(function() {
      browserHistory.push('/dashboard');
    })
    .catch(function(err){
      console.log(err);
    })
  }

};
