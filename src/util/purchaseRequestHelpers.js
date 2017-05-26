import {firebaseRef} from './../index.js'

module.exports = {
  removePurchaseRequestFromActiveTrades: (uid, purchaseRequestId) => {
    console.log("purchaseRequestHelpers.removePurchaseRequestFromActiveTrades")
    firebaseRef.database().ref('/users/'+uid+'/activetrades/').child(purchaseRequestId).remove()
  },
  addPurchaseRequestToCompletedTrades: (uid, purchaseRequestId, tradeType)=> {
    console.log("purchaseRequestHelpers.addPurchaseRequestToCompletedTrades")
    console.log(uid)
    console.log(purchaseRequestId)
    console.log(tradeType)
    firebaseRef.database().ref("/users/"+uid+'/completedtrades/'+ purchaseRequestId).set({tradeType: tradeType})
  },
  addPurchaseRequestToDisputedTrades: (uid, purchaseRequestId, tradeType) => {
    console.log("purchaseRequestHelpers.addPurchaseRequestToDisputedTrades")
    firebaseRef.database().ref("users/"+uid).child('disputedtrades').child(purchaseRequestId).set({tradeType: tradeType})
  },
  removePurchaseRequestFromDisputedTrades: (uid, purchaseRequestId) => {
    console.log("purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades")
    firebaseRef.database().ref('/users/'+uid+'/disputedtrades/').child(purchaseRequestId).remove()
  }
}
