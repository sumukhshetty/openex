const request = require('request')
import {firebaseRef} from './../../index.js'

export const SET_SELL_TRADE_ADVERTISEMENT = 'SET_SELL_TRADE_ADVERTISEMENT'
function setSellTradeAdvertisement(sellTradeAdvertisementPayload){
  return {
    type: SET_SELL_TRADE_ADVERTISEMENT,
    payload: sellTradeAdvertisementPayload
  }
}

export const SET_SELLER = 'SET_SELLER'
function setSeller(sellerPayload){
  return {
    type: SET_SELLER,
    payload: sellerPayload
  }
}

function clearSeller(){
  return {
    type: 'CLEAR_SELLER',
    payload: null
  }
}

function clearSellTradeAdvertisement(){
  return {
    type: 'CLEAR_SELL_TRADE_ADVERTISEMENT',
    payload: null
  }
}


module.exports = {
  sellTradeAdvertisement: (sellTradeAdvertisements, sellTradeAdvertisementId, users) => (dispatch) => {
    var sellAdvertisement = sellTradeAdvertisements[sellTradeAdvertisementId]
    dispatch(setSellTradeAdvertisement(sellAdvertisement))
    dispatch(setSeller(users[sellAdvertisement.sellerUid]))
  },
  buyerCreatesPurchaseRequest: (sellTradeAdvertisement, sellTradeAdvertisementId, seller, buyer) => (dispatch) => {
    var postData = {
      sellTradeAdvertisementId: sellTradeAdvertisementId,
      sellTradeAdvertisement: sellTradeAdvertisement,
      seller: seller,
      buyer: buyer
    }
    var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/buyerCreatesPurchaseRequest'
    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }
    request(options, function(err, res, body){
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var statusCode = res.statusCode
      if(statusCode === 500) {
        console.error('Server responded with an error: ' + res.body.error);
        throw res.body.error
      }
      if(statusCode === 200) {
        var _body = buyer.profile.username + " has created a purchase request"
        var _fcmToken
        if(seller.fcmToken){
          _fcmToken = seller.fcmToken
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
          "recipientEmail": seller.profile.email,
          "verifiedEmail": seller.profile.verifiedEmail,
          "senderUsername": buyer.profile.username,
          "selltradeadvertisement": sellTradeAdvertisement,
          "seen": false,
          "createdAt": Date.now()
        }
        var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
        firebaseRef.database().ref('/users/'+seller.data.uid+'/notifications/'+newNotifcation.key).set({vaule:true}) 
      }
    })
  },
  clearState: () => (dispatch) => {
    dispatch(clearSeller())
    dispatch(clearSellTradeAdvertisement())
  }
}