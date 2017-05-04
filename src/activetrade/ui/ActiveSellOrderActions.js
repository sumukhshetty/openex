// import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import SellOrderContract from '../../../build/contracts/SellOrder.json';
// import { browserHistory } from 'react-router'
// import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'
import * as orderHelpers from './../../util/orderHelpers'

const request = require('request')

export const GET_SELL_ORDER = 'GET_SELL_ORDER';
function getSellOrder (sellOrderPayload) {
  return {
    type: GET_SELL_ORDER,
    payload: sellOrderPayload
  };
}

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
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


  confirmTrade: (sellOrder, contractAddress, buyerAddress, requestId, amount, web3) => (dispatch) => {
    console.log("ui.actions.confirmTrade")
    dispatch(sendEtherState('sending'));
    var coinbase = web3.eth.coinbase;
    const order = contract(SellOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    // get the fcmToken of the buyer
    firebaseRef.database().ref('/users/'+ sellOrder.buyerUid + '/fcmToken/').once("value", function(snap){
      var fcmToken = snap.val()
      var postData = {
        buyerFcmToken: fcmToken,
        sellerUsername: sellOrder.sellerUsername
      }
      var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/confirmTrade'
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
          console.log("confirmTrade.200")
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
        }
      })
    }, function(error){
      console.log("[confirmTrade]: ",error)
    })
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
        dispatch(sendEtherState('init'));
        console.log('error in confirmTradeAction [ActiveSellOrderActions]');
        console.log(error);
      })
  },

  confirmPayment: (sellOrder, requestId) => (dispatch) => {
    firebaseRef.database().ref('/users/'+ sellOrder.sellerUid + '/fcmToken/').once("value", function(snap){
      var fcmToken = snap.val()
      var postData = {
        sellerFcmToken: fcmToken,
        buyerUsername: sellOrder.buyerUsername
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
          console.log("confirmPayment.200")
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
        }
      })
    }, function(error){
      console.log("[confirmTrade]: ",error)
    })
    firebaseRef.database().ref('/purchaserequests/' + requestId +'/status')
    .set('Awaiting Release');
  },

  releaseEther: (sellOrder, contractAddress, buyerAddress, requestId, buyerUid, sellerUid, web3) => (dispatch) => {
    dispatch(sendEtherState('sending'));
    firebaseRef.database().ref('/users/'+ sellOrder.buyerUid + '/fcmToken/').once("value", function(snap){
      var fcmToken = snap.val()
      var postData = {
        buyerFcmToken: fcmToken,
        sellerUsername: sellOrder.sellerUsername
      }
      var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/releaseEther'
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
          console.log("releaseEther.200")
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
        }
      })
    }, function(error){
      console.log("[releaseEther]: ",error)
    })
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

          firebaseRef.database().ref("users/"+buyerUid+'/lastTransfer').set(firebaseRef.database.ServerValue.TIMESTAMP)
          firebaseRef.database().ref("users/"+sellerUid+'/lastTransfer').set(firebaseRef.database.ServerValue.TIMESTAMP)
        });
      })
      .catch(function (error) {
        dispatch(sendEtherState('init'));
        console.log('error in releaseEtherAction [ActiveSellOrderActions]');
        console.log(error);
      })
  },

  resetEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  },

};
