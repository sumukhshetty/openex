import {firebaseRef, FIREBASE_TIMESTAMP} from './../../index.js'
import * as purchaseRequestHelpers from './../../util/purchaseRequestHelpers'


function setActiveTrade(purchaseRequestPayload){
  return {
    type: 'SET_ACTIVE_TRADE',
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

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
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


module.exports = {
  activeTrade: (purchaseRequests, purchaseRequestId, users) => (dispatch) => {
    var activeTrade = purchaseRequests.data[purchaseRequestId]
    dispatch(setActiveTrade(activeTrade))
    dispatch(setBuyer(users.data[activeTrade.buyerUid]))
    dispatch(setSeller(users.data[activeTrade.sellerUid]))
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
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId +'/status')
          .set('All Done')
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });

  },
  sellerCancelsTrade:(seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerCancelsTrade")
    console.log(seller)
    console.log(purchaseRequest)
    console.log(purchaseRequestId)
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
            purchaseRequest, {
              sellercancelstime: now.toUTCString(),
              status: 'Seller Canceled Trade',
              lastUpdated: now.toUTCString()
            })
    console.log(updatedPurchaseRequest)
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId)
          .set(updatedPurchaseRequest)
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });
  },
  buyerCancelsTrade:(buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("ui.ActiveTradeActions.buyerCancelsTrade")
    console.log(buyer)
    console.log(purchaseRequest)
    console.log(purchaseRequestId)
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
            purchaseRequest, {
              buyercancelstime: now.toUTCString(),
              status: 'Buyer Canceled Trade',
              lastUpdated: now.toUTCString()
            })
    firebaseRef.database().ref('/purchaserequests/'+buyer.country+'/'+ purchaseRequestId +'/status')
          .set('Buyer Canceled Trade')
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });
  },
  sellerRaisesDispute: (seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.sellerRaisesDispute")
    firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId + '/status')
          .set('Seller Raises Dispute')
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
          });
  },
  buyerRaisesDispute: (buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.buyerRaisesDispute")
    firebaseRef.database().ref('/purchaserequests/'+ buyer.country + '/' + purchaseRequestId + '/status')
      .set('Buyer Raises Dispute')
      .then(function() {
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

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
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

        firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
        firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
      });
  },
  arbiterVotesForBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId) => (dispatch) =>{
    console.log("activetrade.ui.arbiterVotesForBuyer") 
    // TODO web3 stuff
    firebaseRef.database().ref('/purchaserequests/'+ buyer.country + '/' + purchaseRequestId + '/status')
      .set('Arbiter Votes For Buyer')
      .then(function() {
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

        firebaseRef.database().ref("users/" + purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
        firebaseRef.database().ref("users/" + purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
      });
  },
  clearState: () => (dispatch) => {
    dispatch(clearBuyer())
    dispatch(clearSeller())
    dispatch(clearActiveTrade())
  },
  resetEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  }
}
