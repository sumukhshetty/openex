import {firebaseRef, FIREBASE_TIMESTAMP} from './../index.js'

module.exports = {
  sendBuyerCreatesPurchaseRequestNotification: (purchaseRequestId, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyer) => {
    var _body = buyer.profile.username + " has created a purchase request"
    var _fcmToken
    if(seller.fcmToken){
      _fcmToken = seller.data.fcmToken
    } else {
      _fcmToken = null
    }
    var notificationData = {
      "title": "New Seller Confirmation",
      "body": _body,
      "type": "accept-buy-order",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": seller.data.verifiedEmail,
      "senderUsername": buyer.profile.username,
      "sellTradeAdvertisementId": sellTradeAdvertisementId,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+sellTradeAdvertisement.sellerUid+'/'+purchaseRequestId+'/status/buyercreatespurchaserequest').update(notificationData)

  },
  sendSellerCreatesPurchaseRequestNotification: (purchaseRequestId, buyTradeAdvertisementId, buyTradeAdvertisement, seller, buyer) => {
    var _body = seller.profile.username + " has responded to your Buy Trade Advertisement"
    var _fcmToken
      if(buyer.data.fcmToken){
        _fcmToken = buyer.data.fcmToken
      } else {
        _fcmToken = null
      }
    var notificationData = {
        "title": "New Buy Trade Advertisement Response",
        "body": _body,
        "type": "accept-buy-order",
        "email": true,
        "fcm": true,
        "recipientToken": _fcmToken,
        "verifiedEmail": buyer.data.verifiedEmail,
        "senderUsername": seller.profile.username,
        "buyTradeAdvertisementId": buyTradeAdvertisementId,
        "purchaseRequestId": purchaseRequestId,
        "seen": false,
        "createdAt": FIREBASE_TIMESTAMP
      }
      firebaseRef.database().ref("/notifications/"+buyTradeAdvertisement.buyerUid+'/'+purchaseRequestId+'/status/sellercreatespurchaserequest').update(notificationData)
  },
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
      "createdAt": FIREBASE_TIMESTAMP
    }

    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid+'/'+purchaseRequestId+'/status/buyerconfirmspayment').update(notificationData)
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
      "createdAt": FIREBASE_TIMESTAMP
    }

    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid+'/'+purchaseRequestId+'/status/sellerconfirmstrade').update(notificationData)
  },
  sendSellerReleasesEtherNotification: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    console.log("notificationHelpers.sendSellerReleasesEtherNotification")
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
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid+'/'+purchaseRequestId+'/status/sellerreleasesether').update(notificationData)
  },
}