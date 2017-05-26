import {firebaseRef} from './../index.js'

module.exports = {
  removePurchaseRequestFromActiveTrades: (uid, purchaseRequestId) => {
    firebaseRef.database().ref('/users/'+uid+'/activetrades/').child(purchaseRequestId).remove()
  },
  addPurchaseRequestToCompletedTrades: (uid, purchaseRequestId, tradeType)=> {
    firebaseRef.database().ref("/users/"+uid+'/completedtrades/'+ purchaseRequestId).set({tradeType: tradeType})
  },
  addPurchaseRequestToDisputedTrades: (uid, purchaseRequestId, tradeType) => {
    firebaseRef.database().ref("users/"+uid).child('disputedtrades').child(purchaseRequestId).set({tradeType: tradeType})
  },
  removePurchaseRequestFromDisputedTrades: (uid, purchaseRequestId) => {
    firebaseRef.database().ref('/users/'+uid+'/disputedtrades/').child(purchaseRequestId).remove()
  }
}
