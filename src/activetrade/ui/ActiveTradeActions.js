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
    //TODO web3 stuff with the sellOrderBookContract
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        lastUpdated: now.toUTCString(),
        sellerconfirmtime: now.toUTCString(),
        status: 'Awaiting Payment'
      })
    console.log(updatedPurchaseRequest)
    var updatedRef = firebaseRef.database().ref('/purchaserequests/' + seller.country + '/' + purchaseRequestId)
    .set(updatedPurchaseRequest, function(error){
      if(error){
        console.log(error)
      } else {
        dispatch(setActiveTrade(updatedPurchaseRequest))
      }
    });
  },
  buyerConfirmsPayment: (buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        buyerconfirrmpaymenttime: now.toUTCString(),
        lastUpdated: now.toUTCString(),
        status: 'Awaiting Release'
      })
    firebaseRef.database().ref('/purchaserequests/'+buyer.country+'/'+ purchaseRequestId)
      .set(updatedPurchaseRequest, function(error){
        if(error){
          console.log(error)
        } else {
          dispatch(setActiveTrade(updatedPurchaseRequest))
        }
      });
  },
  sellerReleasesEther: (seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        lastUpdated: now.toUTCString(),
        sellerreleaseethertime: now.toUTCString(),
        status: 'All Done'
    })
    // TODO web3 stuff with sellOrderBookContract
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId)
          .set(updatedPurchaseRequest)
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

            firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
            dispatch(setActiveTrade(updatedPurchaseRequest))
          });

  },
  sellerCancelsTrade:(seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerCancelsTrade")
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
            dispatch(setActiveTrade(updatedPurchaseRequest))
          });
  },
  buyerCancelsTrade:(buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
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
            dispatch(setActiveTrade(updatedPurchaseRequest))
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
  sellerRatesBuyer: (rating, purchaseRequestId, purchaseRequest) => (dispatch) => {
    firebaseRef.database().ref('/traderating/' + purchaseRequest.buyerUid + '/' + purchaseRequestId).set({rating: rating})
  },
  buyerRatesSeller: (rating, purchaseRequestId, purchaseRequest)  => (dispatch) => {
    firebaseRef.database().ref('/traderating/' + purchaseRequest.sellerUid + '/' + purchaseRequestId).set({rating: rating})
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
