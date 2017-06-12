import {firebaseRef, FIREBASE_TIMESTAMP} from './../index.js'
// group-user-country pass in the country
module.exports = {
  removePurchaseRequestFromActiveTrades: (uid, purchaseRequestId) => {
    firebaseRef.database().ref('/users/'+uid+'/activetrades/').child(purchaseRequestId).remove()
  },
  addPurchaseRequestToCompletedTrades: (uid, purchaseRequestId, tradeType)=> {
    firebaseRef.database().ref("/users/"+uid+'/completedtrades/'+ purchaseRequestId).set({tradeType: tradeType})
  },
  addPurchaseRequestToDisputedTrades: (uid, purchaseRequestId, tradeType) => {
    firebaseRef.database().ref("/disputes/").child(purchaseRequestId).set({tradeType: tradeType})
  },
  removePurchaseRequestFromDisputedTrades: (uid, purchaseRequestId) => {
    firebaseRef.database().ref("/disputes/").child(purchaseRequestId).remove()
  },
  updateUserTradingStats: (purchaseRequest, userUid, users) => {
    var userProfile = users.data[userUid]
    var updatedUserTradeVolume = parseInt(Number(userProfile.tradeVolume), 10) + parseInt(Number(purchaseRequest.etherAmount), 10)

    var updatedUserNumberOfTrades = parseInt(Number(userProfile.numberOfTrades), 10) + 1
    var userTradingPartners, tradingPartnerUid
    if (userUid===purchaseRequest.buyerUid){

      tradingPartnerUid = purchaseRequest.sellerUid
    } else {

      tradingPartnerUid = purchaseRequest.buyerUid
    }
    try {
      userTradingPartners = userProfile.tradingPartners
      userTradingPartners[tradingPartnerUid] = true
    } catch(err) {
      userTradingPartners = {}
      userTradingPartners[tradingPartnerUid] = true
    }
    var updatedUserProfile = Object.assign({}, userProfile,{
      tradeVolume: updatedUserTradeVolume,
      numberOfTrades: updatedUserNumberOfTrades,
      firstPurchase: (userProfile.tradeVolume === 0) ? FIREBASE_TIMESTAMP : userProfile.firstPurchase,
      tradingPartners: userTradingPartners,
      lastTransfer: FIREBASE_TIMESTAMP
    })
    firebaseRef.database().ref('/users/' + userUid).set(updatedUserProfile).then(function(){

    })
  }
}
