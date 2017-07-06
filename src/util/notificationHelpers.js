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
      "type": "buyercreatespurchaserequest",
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
    //firebaseRef.database().ref("/notifications/"+sellTradeAdvertisement.sellerUid+'/'+purchaseRequestId+'/status/buyercreatespurchaserequest').update(notificationData)
    firebaseRef.database().ref("/notifications/"+sellTradeAdvertisement.sellerUid).push(notificationData)

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
        "title": "New Buy Trade Advertisement Response from seller.profile.username",
        "body": _body,
        "type": "sellercreatespurchaserequest",
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
      //firebaseRef.database().ref("/notifications/"+buyTradeAdvertisement.buyerUid+'/'+purchaseRequestId+'/status/sellercreatespurchaserequest').update(notificationData)
      firebaseRef.database().ref("/notifications/"+buyTradeAdvertisement.buyerUid).push(notificationData)
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
      "type": "buyerconfirmspayment",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": seller.verifiedEmail,
      "senderUsername": purchaseRequest.buyerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }

    //firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid+'/'+purchaseRequestId+'/status/buyerconfirmspayment').update(notificationData)
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(notificationData)
  },
  sendSellerConfirmsTradeNotification: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    console.log('notificationHelpers.sendSellerConfirmsTradeNotification')
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
      "type": "sellerconfirmstrade",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }

    //firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid+'/'+purchaseRequestId+'/status/sellerconfirmstrade').update(notificationData)
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(notificationData)
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
      "type": "sellerreleasesether",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    //firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid+'/'+purchaseRequestId+'/status/sellerreleasesether').update(notificationData)
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(notificationData)
  },
  sendArbiterReleasesToSeller: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _buyerfcmToken
    var _sellerfcmToken
    if(buyer.fcmToken){
      _buyerfcmToken = buyer.fcmToken
    } else {
      _buyerfcmToken = null
    }
    if (seller.fcmToken){
      _sellerfcmToken = seller.fcmToken
    } else {
      _sellerfcmToken = null
    }

    var _body = "The arbiter has resolved the dispute in favor of the seller"
    var buyerNotificationData = {
      "title": "Arbiter released ether to seller",
      "body": _body,
      "type": "arbiterreleasestoseller",
      "email": true,
      "fcm": true,
      "recipientToken": _buyerfcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    //firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid+'/'+purchaseRequestId+'/status/arbiterreleasestoseller').update(buyerNotificationData)
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(buyerNotificationData)
    var sellerNotificationData = {
      "title": "Arbiter released ether to seller",
      "body": _body,
      "type": "arbiterreleasestoseller",
      "email": true,
      "fcm": true,
      "recipientToken": _sellerfcmToken,
      "verifiedEmail": -seller.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    //firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid+'/'+purchaseRequestId+'/status/arbiterreleasestoseller').update(sellerNotificationData)
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(sellerNotificationData)
  },
sendArbiterReleasesToBuyer: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    console.log("notificationHelpers.sendArbiterReleasesToBuyer")
    var _buyerfcmToken
    var _sellerfcmToken
    if(buyer.fcmToken){
      _buyerfcmToken = buyer.fcmToken
    } else {
      _buyerfcmToken = null
    }
    if (seller.fcmToken){
      _sellerfcmToken = seller.fcmToken
    } else {
      _sellerfcmToken = null
    }

    var _body = "The arbiter has resolved the dispute in favor of the buyer"
    var buyerNotificationData = {
      "title": "Arbiter released ether to buyer",
      "body": _body,
      "type": "arbiterreleasestobuyer",
      "email": true,
      "fcm": true,
      "recipientToken": _buyerfcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    //firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid+'/'+purchaseRequestId+'/status/arbiterreleasestobuyer').update(buyerNotificationData)
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(buyerNotificationData)
    var sellerNotificationData = {
      "title": "Arbiter released ether to buyer",
      "body": _body,
      "type": "arbiterreleasestobuyer",
      "email": true,
      "fcm": true,
      "recipientToken": _sellerfcmToken,
      "verifiedEmail": -seller.verifiedEmail,
      "senderUsername": purchaseRequest.buuyerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    //firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid+'/'+purchaseRequestId+'/status/arbiterreleasestobuyer').update(sellerNotificationData)
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(sellerNotificationData)
  },
}