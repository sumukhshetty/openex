const request = require('request')

import { browserHistory } from 'react-router'

import {firebaseRef, FIREBASE_TIMESTAMP} from './../../index.js'


function setActiveTrade(purchaseRequestPayload){
  return {
    type: 'SET_ACTIVE_TRADE'
    payload: purchaseRequestPayload
  }
}

export const SET_BUYER = 'SET_BUYER'
function setBuyer(buyerPayload){
  return {
    type: SET_BUYER,
    payload: buyerPayload
  }
}

function setSeller(sellerPayload){
  return {
    type: 'SET_SELLER',
    payload: sellerPayload
  }
}

function clearBuyer(){
  return {
    type: 'CLEAR_BUYER',
    payload: null
  }
}

function clearSeller(){
  return {
    type: 'CLEAR_SELLER',
    payload: null
  }
}

function clearActiveTrade(){
  return {
    type: 'CLEAR_ACTIVE_TRADE',
    payload: null
  }
}

export const GET_USER_INFO = 'GET_USER_INFO'
function getUserInfo(userPayload) {
  return {
    type: GET_USER_INFO,
    payload: userPayload
  }
}

module.exports = {
  activeTrade: (purchaseRequests, purchaseRequestId, users) => (dispatch) => {
    var activeTrade = purchaseRequests.data[purchaseRequestId]
    dispatch(setActiveTrade(activeTrade))
    dispatch(setBuyer(users[activeTrade.buyerUid]))
    dispatch(setSeller(users[activeTrade.sellerUid]))
  },
  sellerConfirmsTrade: (seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerConfirms")
    //TODO web3 stuff with the sellOrderBookContract
    firebaseRef.database().ref('/purchaserequests/' + seller.country + '/' + purchaseRequestId +'/status').set('Awaiting Payment');
  },
  buyerConfirmsPayment: (buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.buyerConfirmsPayment")
    firebaseRef.database().ref('/purchaserequests/'+buyer.country+'/'+ purchaseRequestId +'/status').set('Awaiting Release');
  },
  sellerReleasesEther: (seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.sellerReleasesEther")
    // TODO web3 stuff with sellOrderBookContract
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+requestId +'/status')
          .set('All Done')
          .then(function() {
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeType)
            orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });

  },
  sellerCancelsTrade:(seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerCancelsTrade")
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+requestId +'/status')
          .set('Sell Cancels Trade')
          .then(function() {
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeType)
            orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });
  },
  buyerCancelsTrade:(buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("ui.ActiveTradeActions.buyerCancelsTrade")
    firebaseRef.database().ref('/purchaserequests/'+buyer.country+'/'+ purchaseRequestId +'/status')
          .set('Buyer Cancels Trade')
          .then(function() {
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeType)
            orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });
  },
  sellerRaisesDispute: (seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.sellerRaisesDispute")
    firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId + '/status')
          .set('Seller Raises Dispute')
          .then(function() {
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            orderHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeType)
            orderHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });
  },
  buyerRaisesDispute: (buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.buyerRaisesDispute")
    firebaseRef.database().ref('/purchaserequests/'+ buyer.country + '/' + purchaseRequestId + '/status')
      .set('Buyer Raises Dispute')
      .then(function() {
        orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
        orderHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
        orderHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeType)
        orderHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeType)

        firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
        firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
      });
  },
  arbiterVotesForSeller: (seller, arbiter, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.arbiterVotesForSeller")
    // TODO web3 stuff
    firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId + '/status')
      .set('Arbiter Votes For Seller')
      .then(function() {
        orderHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId)
        orderHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId)
        orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeType)
        orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeType)

        firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
        firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
      });
  }
  arbiterVotesForBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId) => (dispatch) =>{
    console.log("activetrade.ui.arbiterVotesForBuyer") 
    // TODO web3 stuff
    firebaseRef.database().ref('/purchaserequests/'+ buyer.country + '/' + purchaseRequestId + '/status')
      .set('Arbiter Votes For Buyer')
      .then(function() {
        orderHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId)
        orderHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId)
        orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeType)
        orderHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeType)

        firebaseRef.database().ref("users/" + purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
        firebaseRef.database().ref("users/" + purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
      });
  }
  clearState: () => (dispatch) {
    dispatch(clearBuyer())
    dispatch(clearSeller())
    dispatch(clearActiveTrade())
  }
}
