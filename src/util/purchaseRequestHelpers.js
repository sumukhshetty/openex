import {firebaseRef} from './../index.js'

module.exports = {
  removePurchaseRequestFromActiveTrades: (uid, purchaseRequestId) => {
    firebaseRef.database().ref('/users/'+uid+'/activeTrades/').child(purchaseRequestId).remove()
  },
  addPurchaseRequestToCompletedTrades: (uid, purchaseRequestId, tradeType)=> {
    firebaseRef.database().ref("users/"+uid).child('completedTrades').child(purchaseRequestId).set({tradeType: tradeType})
  },
  addPurchaseRequestToDisputedTrades: (uid, purchaseRequestId, tradeType) => {
    firebaseRef.database().ref("users/"+uid).child('disputedTrades').child(purchaseRequestId).set({tradeType: tradeType})
  },
  removePurchaseRequestFromDisputedTrades: (uid, purchaseRequestId) => {
    firebaseRef.database().ref('/users/'+uid+'/disputedTrades/').child(purchaseRequestId).remove()
  }
}
