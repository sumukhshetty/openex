import {firebaseRef} from './../index.js'
// group-user-country pass in the country
module.exports = {
  removePurchaseRequestFromActiveTrades: (uid, purchaseRequestId) => {
    firebaseRef.database().ref('/users/'+uid+'/activetrades/').child(purchaseRequestId).remove()
  },
  addPurchaseRequestToCompletedTrades: (uid, purchaseRequestId, tradeType)=> {
    firebaseRef.database().ref("/users/"+uid+'/completedtrades/'+ purchaseRequestId).set({tradeType: tradeType})
  },
  addPurchaseRequestToDisputedTrades: (uid, purchaseRequestId, tradeType) => {
    //firebaseRef.database().ref("users/"+uid).child('disputedtrades').child(purchaseRequestId).set({tradeType: tradeType})
    firebaseRef.database().ref("disputes/").child(purchaseRequestId).set({tradeType: tradeType})
  },
  removePurchaseRequestFromDisputedTrades: (uid, purchaseRequestId) => {
    //firebaseRef.database().ref('/users/'+uid+'/disputedtrades/').child(purchaseRequestId).remove()
    firebaseRef.database().ref("disputes/").child(purchaseRequestId).remove()
  }
}
