import {firebaseRef, FIREBASE_TIMESTAMP} from './../index.js'

module.exports = {
  sendBuyerConfirmsPaymentNotification: (buyer,seller,purchaseRequest,purchaseRequestId) => {
    var _fcmToken
    if(seller.fcmToken){
      _fcmToken = seller.fcmToken
    } else {
      _fcmToken = null
    }

    var _body = purchaseRequest.buyerUsername + " has confirmed the payment"
    var notificationData = {
      "title": "New Payment Confirmation",
      "body": _body,
      "type": "confirmPayment",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": seller.verifiedEmail,
      "senderUsername": purchaseRequest.buyerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": new Date.now()
    }

    var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
    firebaseRef.database().ref('/users/'+purchaseRequest.sellerUid+'/notifications/'+newNotifcation.key).set({vaule:true})
  },
  sendSellerConfirmsTradeNotification: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _fcmToken
    if(buyer.fcmToken){
      _fcmToken = buyer.fcmToken
    } else {
      _fcmToken = null
    }
    var _body = purchaseRequest.sellerUsername + " has confirmed the trade"
    var notificationData = {
      "title": "New Trade Confirmation",
      "body": _body,
      "type": "confirmTrade",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": Date.now()
    }

    var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
    firebaseRef.database().ref('/users/'+purchaseRequest.buyerUid+'/notifications/'+newNotifcation.key).set({vaule:true})
  },
  sendSellerReleasesEtherNotification: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _fcmToken
    if(buyer.fcmToken){
      _fcmToken = buyer.fcmToken
    } else {
      _fcmToken = null
    }

    var _body = purchaseRequest.sellerUsername + " has released the Ether"
    var notificationData = {
      "title": "Ether released from escrow",
      "body": _body,
      "tyep": "releaseEther",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      //"orderId": sellOrder.orderId,
      "seen": false,
      "createdAt": Date.now()
    }
    var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
    firebaseRef.database().ref('/users/'+purchaseRequest.buyerUid+'/notifications/'+newNotifcation.key).set({vaule:true})
  },
}