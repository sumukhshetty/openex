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
    firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid).once("value", function(snap){
      var userData = snap.val()  
      firebaseRef.database().ref('/buyorders/' + userData.country + '/' + orderId)
        .on('value', function (snapshot) {
          dispatch(getBuyOrder(snapshot.val()));
        });
    })
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
            firebaseRef.database().ref('/users/'+ buyOrder.buyerUid).once("value", function(snap){
              var buyerUserData = snap.val()
              //var buyerfcmToken = snap.val()
              var _body = buyOrder.sellerUsername + " has sent Ether to the Escrow Contract"
              var _fcmToken
              if(buyerUserData.fcmToken){
                _fcmToken = buyerUserData.fcmToken
              } else {
                _fcmToken = null
              }
              var notificationData = {
                "title": "Ether sent to Escrow Contract",
                "body": _body,
                "type": "fillEscrow",
                "email": true, // TODO get this from user's preferences
                "fcm": true, // TODO get this from user's preferences
                "recipientToken": _fcmToken,
                "recipientEmail": buyerUserData.email,
                "verifiedEmail": buyerUserData.verifiedEmail,                
                "senderUsername": buyOrder.sellerUsername,
                "orderId": orderId,
                "seen": false,
                "createdAt": Date.now()
              }

              request({
                  method: 'post',
                  body: {
                    orderId: orderId,
                    sellerUid: sellerUid,
                    sellerUsername: buyOrder.sellerUsername,
                    buyerFcmToken: buyerUserData.fcmToken
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
                    try{
                      var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
                      firebaseRef.database().ref('/users/'+buyOrder.buyerUid+'/notifications/'+newNotifcation.key).set({vaule:true})

                    } catch(e){
                      console.log("[createBuyOrderContract]",e)
                    }
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
    firebaseRef.database().ref('/users/'+ buyOrder.sellerUid).once("value", function(snap){
      var sellerUserData = snap.val()
      //var sellerfcmToken = snap.val()

      var _body = buyOrder.buyerUsername + " has confirmed the payment"
      var _fcmToken
      if(sellerUserData.fcmToken){
        _fcmToken = sellerUserData.fcmToken
      } else {
        _fcmToken = null
      }
      var notificationData = {
        "title": "New Payment Confirmation",
        "body": _body,
        "type": "paymentConfirmed",
        "email": true,
        "fcm": true,
        "recipientToken": _fcmToken,
        "recipientEmail": sellerUserData.email,
        "verifiedEmail": sellerUserData.verifiedEmail,
        "senderUsername": buyOrder.buyerUsername,
        "orderId": orderId,
        "seen": false,
        "createdAt": Date.now()
      }


      var postData = {
        sellerFcmToken: sellerUserData.fcmToken,
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
          try{
            var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
            firebaseRef.database().ref('/users/'+buyOrder.sellerUid+'/notifications/'+newNotifcation.key).set({vaule:true})
            //TODO decide if we move this db call into functions
            firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid).once("value", function(snap){
              var userData = snap.val()
              firebaseRef.database().ref('/buyorders/' + userData.country + '/' + orderId + '/status')
                .set('Payment Confirmed');
            })
          } catch(e){
            console.log("[paymentConfirmed]",e)
          }
          console.log("paymentConfirmed.200")
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
        }
      })
    })
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
      firebaseRef.database().ref('/users/'+ buyOrder.buyerUid).once("value", function(snap){
        var buyerUserData = snap.val()
        //var buyerfcmToken = snap.val()
        var _body = buyOrder.sellerUsername + " has released the Ether"
        var _fcmToken
        if(buyerUserData.fcmToken){
          _fcmToken = buyerUserData.fcmToken
        } else {
          _fcmToken = null
        }
        var notificationData = {
          "title": "Ether Released from Escrow",
          "body": _body,
          "type": "seller-trade-confirmation",
          "email": true,
          "fcm": true,
          "recipientToken": _fcmToken,
          "recipientEmail": buyerUserData.email,
          "verifiedEmail": buyerUserData.verifiedEmail,
          "senderUsername": buyOrder.sellerUsername,
          "orderId": orderId,
          "seen": false,
          "createdAt": Date.now()
        }

        request({
            method: 'post',
            body: {
              orderId: orderId,
              sellerUid: sellerUid,
              buyerUid: buyerUid,
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
            try{
              var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
              firebaseRef.database().ref('/users/'+buyOrder.buyerUid+'/notifications/'+newNotifcation.key).set({vaule:true})
              firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid+ '/numberOfTrades').once("value", function(snap){
                var numberOfTrades = snap.val()
                firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid+ '/numberOfTrades')
                .set(numberOfTrades+1);
              })
            } catch(e){
              console.log("[releaseEscrow]",e)
            }
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
    firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid).once("value", function(snap){
      var userData = snap.val()  
      firebaseRef.database().ref('/buyorders/' + userData.country + '/' + orderId + '/cancelled')
      .set(uid)
      .then(function() {
        browserHistory.push('/dashboard');
      })
      .catch(function(err){
        console.log(err);
      })
    })
  }

};
