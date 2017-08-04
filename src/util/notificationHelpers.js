import {firebaseRef, FIREBASE_TIMESTAMP} from './../index.js'

module.exports = {
  sendBuyerCreatesPurchaseRequestNotification: (purchaseRequest, purchaseRequestId, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyer) => {
    var _body = "Hi " + seller.data.username +" - you got a new offer to your SELL advertisement. You'll have to approve the transaction before the buyer transfers the money to you. DEAL: " +  purchaseRequest.fiatAmount + " " + seller.data.currency +" = " + purchaseRequest.etherAmount + "ETH (price " + purchaseRequest.price + " " + seller.data.currency + "/ETH). You can communicate with the buyer on the chat window of your trade page. Please respond on our website: ezether.com/activetrade/"+purchaseRequestId 
    var _fcmToken
    if(seller.data.fcmToken){
      _fcmToken = seller.data.fcmToken
    } else {
      _fcmToken = null
    }
    var notificationData = {
      "title": "New offer on your sell trade advertisement",
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
    firebaseRef.database().ref("/notifications/"+sellTradeAdvertisement.sellerUid).push(notificationData)

    var _bodyToBuyer = "Hi " + buyer.profile.username + " - Your trade has been initiated with " + seller.data.username +". Wait for the seller to approve the transaction before you transfer the money to him. DEAL: " +  purchaseRequest.fiatAmount + " " +seller.data.currency +" = " + purchaseRequest.etherAmount + "ETH (price " + purchaseRequest.price + " " + seller.data.currency + "/ETH). You can communicate with the seller on the chat window of your trade page. Please respond on our website: ezether.com/activetrade/"+purchaseRequestId
    if(buyer.profile.fcmToken){
      _fcmToken = buyer.profile.fcmToken
    } else {
      _fcmToken = null
    }
    var notificationDataBuyer = {
      "title": "You've made an offer",
      "body": _bodyToBuyer,
      "type": "buyercreatespurchaserequest",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": buyer.profile.verifiedEmail,
      "senderUsername": seller.data.username,
      "sellTradeAdvertisementId": sellTradeAdvertisementId,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(notificationDataBuyer)
  },
  sendSellerCreatesPurchaseRequestNotification: (purchaseRequest, purchaseRequestId, buyTradeAdvertisementId, buyTradeAdvertisement, seller, buyer) => {
    var _body = "Hi " + buyer.data.username + " - You got a new offer to your BUY advertisement. You'll have to wait for the seller to approve the transaction before you transfer the money. DEAL: " + purchaseRequest.fiatAmount + " " + seller.profile.currency + " = " + purchaseRequest.etherAmount + "ETH (price " + purchaseRequest.price + " " + seller.data.currency + "/ETH). You can communicate with the seller on the chat window of your trade page. Please respond on our website: ezether.com/activetrade/"+purchaseRequestId
    var _fcmToken
    if(buyer.data.fcmToken){
      _fcmToken = buyer.data.fcmToken
    } else {
      _fcmToken = null
    }
    var _title = "New Buy Trade Advertisement Response from " + seller.profile.username
    var notificationData = {
        "title": _title,
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
    firebaseRef.database().ref("/notifications/"+buyTradeAdvertisement.buyerUid).push(notificationData)

    var _bodyToSeller = "Hi " + purchaseRequest.sellerUsername + " - Your trade has been initiated with " + purchaseRequest.buyerUsername + ". You'll have to approve the transaction before the buyer transfers the money to you. DEAL: " + purchaseRequest.fiatAmount + " " + seller.data.currency + " = " + purchaseRequest.etherAmount + "ETH (price " + purchaseRequest.price + " " + seller.data.currency + "/ETH). You can communicate with the buyer on the chat window of your trade page. Please respond on our website: ezether.com/activetrade/"+purchaseRequestId
    var _fcmTokenSeller
    if(seller.profile.fcmToken){
      _fcmToken = seller.profile.fcmToken
    } else {
      _fcmToken = null
    }
    var notificationDataSeller = {
        "title": _title,
        "body": _bodyToSeller,
        "type": "sellercreatespurchaserequest",
        "email": true,
        "fcm": true,
        "recipientToken": _fcmTokenSeller,
        "verifiedEmail": buyer.data.verifiedEmail,
        "senderUsername": seller.profile.username,
        "buyTradeAdvertisementId": buyTradeAdvertisementId,
        "purchaseRequestId": purchaseRequestId,
        "seen": false,
        "createdAt": FIREBASE_TIMESTAMP
      }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(notificationDataSeller)

  },
  sendBuyerConfirmsPaymentNotification: (buyer,seller,purchaseRequest,purchaseRequestId) => {
    var _fcmToken
    if(seller.fcmToken){
      _fcmToken = seller.fcmToken
    } else {
      _fcmToken = null
    }

    var _body = "Hi " + purchaseRequest.sellerUsername + " - The buyer has marked the payment complete. Please look at the transaction receipt on the chat window and check your bank account. Release the ether once the money is reflected on your bank account. If you think the buyer is fraudulent, please dispute the transaction. Do not panic, your ether is safe."
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

    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(notificationData)
  },
  sendSellerConfirmsTradeNotification: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _fcmToken
    if(buyer.fcmToken){
      _fcmToken = buyer.fcmToken
    } else {
      _fcmToken = null
    }
    var _body = "Hi "+ purchaseRequest.buyerUsername + " - The seller has approved the trade. The ether is now is escrow. Please transfer the money and mark the payment complete once its done. The seller can only release the ether after you've marked the payment complete. Please upload a transaction receipt on the chat window."
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

    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(notificationData)
  },
  sendSellerReleasesEtherNotification: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _fcmToken
    if(buyer.fcmToken){
      _fcmToken = buyer.fcmToken
    } else {
      _fcmToken = null
    }

    var _body = "Hi " + purchaseRequest.sellerUsername + " - You have released the transaction to " + purchaseRequest.buyerUsername +", and funds ("+purchaseRequest.etherAmount+" ETH) have been sent to the buyer. Please rate the buyer at ezether.com/activetrade/"+purchaseRequestId
    var notificationData = {
      "title": "Ether released from escrow",
      "body": _body,
      "type": "sellerreleasesether",
      "email": true,
      "fcm": true,
      "recipientToken": _fcmToken,
      "verifiedEmail": seller.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(notificationData)
    var _bodyToBuyer = "Hi " + purchaseRequest.buyerUsername + " - The seller has released the ether. The balance should reflect on your metamask wallet. The transaction is complete. Please rate the seller at ezether.com/activetrade/"+purchaseRequestId
    var _fcmTokenSeller
    if(seller.fcmToken){
      _fcmToken = seller.fcmToken
    } else {
      _fcmToken = null
    }    
    var notificationDataBuyer = {
      "title": "Ether released from escrow",
      "body": _bodyToBuyer,
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
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(notificationDataBuyer)
  },
  sendArbiterReleasesToSeller: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _buyerfcmToken
    var _sellerfcmToken
    if (buyer.fcmToken) {
      _buyerfcmToken = buyer.fcmToken
    } else {
      _buyerfcmToken = null
    }
    if (seller.fcmToken){
      _sellerfcmToken = seller.fcmToken
    } else {
      _sellerfcmToken = null
    }

    var _body = "The dispute management team has resolved the dispute in favor of the seller"
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

    var _body = "The dispute mananagement team has resolved the dispute in favor of the buyer"
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

    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(buyerNotificationData)
    var sellerNotificationData = {
      "title": "Arbiter released ether to buyer",
      "body": _body,
      "type": "arbiterreleasestobuyer",
      "email": true,
      "fcm": true,
      "recipientToken": _sellerfcmToken,
      "verifiedEmail": seller.verifiedEmail,
      "senderUsername": purchaseRequest.buyerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
  
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(sellerNotificationData)
  },
  sendBuyerCancelsTrade: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _buyerfcmToken
    var _sellerfcmToken

    if (seller.fcmToken){
      _sellerfcmToken = seller.fcmToken
    } else {
      _sellerfcmToken = null
    }
    var _bodyToSeller = "Hi " + purchaseRequest.sellerUsername + " - Your trade has been canceled by the buyer."
    var sellerNotificationData = {
      "title": "Buyer Cancels Trade",
      "body": _bodyToSeller,
      "type": "buyercancelstrade",
      "email": true,
      "fcm": true,
      "recipientToken": _sellerfcmToken,
      "verifiedEmail": seller.verifiedEmail,
      "senderUsername": purchaseRequest.buyerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(sellerNotificationData)
  },
  sendSellerCancelsTrade: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _buyerfcmToken
    if(buyer.fcmToken){
      _buyerfcmToken = buyer.fcmToken
    } else {
      _buyerfcmToken = null
    }

    var _bodyToBuyer = "Hi " + purchaseRequest.buyerUsername + " - Your trade has been canceled by the seller. Please reinitiate the trade with another seller on ezether.com/buyether"
    var buyerNotificationData = {
      "title": "Seller cancels trade",
      "body": _bodyToBuyer,
      "type": "sellercancelstrade",
      "email": true,
      "fcm": true,
      "recipientToken": _buyerfcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(buyerNotificationData)
  },
  sendBuyerRaisesDispute: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _bodyToSeller = "Hi " + purchaseRequest.sellerUsername + " - Your trade has been disputed by the buyer. Please upload proof of your transaction by uploading a transaction receipt, bank statement and any other document that supports your case in the chat box at ezether.com/activetrade/" + purchaseRequestId + " Our dispute management team will look into the dispute within the next 24 hours and resolve the case as soon as a possible."
    var _sellerfcmToken
    if(seller.fcmToken){
      _sellerfcmToken = seller.fcmToken
    } else {
      _sellerfcmToken = null
    }
    var sellerNotificationData = {
      "title": "Buyer has raised a dispute",
      "body": _bodyToSeller,
      "type": "buyerraisesdispute",
      "email": true,
      "fcm": true,
      "recipientToken": _sellerfcmToken,
      "verifiedEmail": seller.verifiedEmail,
      "senderUsername": purchaseRequest.buyerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.sellerUid).push(sellerNotificationData)
  },
  sendSellerRaisesDispute: (seller, buyer, purchaseRequest, purchaseRequestId) => {
    var _bodyToBuyer = "Hi " + purchaseRequest.buyerUsername + " - Your trade has been disputed by the seller. Please upload proof of your transaction by uploading a transaction receipt, bank statement and any other document that supports your case in the chat box at ezether.com/activetrade/" + purchaseRequestId + " Our dispute management team will look into the dispute within the next 24 hours and resolve the case as soon as a possible."
    var _buyerfcmToken
    if(buyer.fcmToken){
      _buyerfcmToken = buyer.fcmToken
    } else {
      _buyerfcmToken = null
    }
    var buyerNotificationData = {
      "title": "Seller has raised a dispute",
      "body": _bodyToBuyer,
      "type": "selleraiseddispute",
      "email": true,
      "fcm": true,
      "recipientToken": _buyerfcmToken,
      "verifiedEmail": buyer.verifiedEmail,
      "senderUsername": purchaseRequest.sellerUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+purchaseRequest.buyerUid).push(buyerNotificationData)
  },
  sendNewChatNotification: (userUid, purchaseRequest, purchaseRequestId, content) => {
    var senderUid, senderUsername, recipientUid, recipientUsername
    if(userUid  === purchaseRequest.buyerUid) {
      senderUid = userUid
      senderUsername = purchaseRequest.buyerUsername
      recipientUid = purchaseRequest.sellerUid
      recipientUsername = purchaseRequest.sellerUsername
    } else if (userUid === purchaseRequest.sellerUid) {
      senderUid = userUid
      senderUsername = purchaseRequest.sellerUsername
      recipientUid = purchaseRequest.buyerUid
      recipientUsername = purchaseRequest.buyerUsername
    }
    var _body = "Hi " + recipientUsername + "- You've got a new chat message from " + senderUsername + ". Message: '" + content +"'. You can repond by going to ezether.com/activetrade/"+purchaseRequestId
    var _title = "New Chat Message from " + senderUsername
    var newChatMessageNotificationData = {
      "title": _title,
      "body": _body,
      type: "newchatmessage",
      email: true,
      "fcm": false,
      recipientToken: null,
      "verifiedEmail": true,
      "senderUsername": senderUsername,
      "purchaseRequestId": purchaseRequestId,
      "seen": false,
      "createdAt": FIREBASE_TIMESTAMP
    }
    firebaseRef.database().ref("/notifications/"+recipientUid).push(newChatMessageNotificationData)
  }
}