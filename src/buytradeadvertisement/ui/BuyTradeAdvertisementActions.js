import { browserHistory } from 'react-router'

const request = require('request')
import {firebaseRef} from './../../index.js'


export const SET_BUY_TRADE_ADVERTISEMENT = 'SET_BUY_TRADE_ADVERTISEMENT'
function setBuyTradeAdvertisement(buyTradeAdvertisementPayload){
  return {
    type: SET_BUY_TRADE_ADVERTISEMENT,
    payload: buyTradeAdvertisementPayload
  }
}

export const SET_BUYER = 'SET_BUYER'
function setBuyer(buyerPayload){
  return {
    type: SET_BUYER,
    payload: buyerPayload
  }
}

function clearBuyer(){
  return {
    type: 'CLEAR_BUYER',
    payload: null
  }
}

function clearBuyTradeAdvertisement(){
  return {
    type: 'CLEAR_BUY_TRADE_ADVERTISEMENT',
    payload: null
  }
}

export const GET_USER_INFO = 'GET_USER_INFO'
function getUserInfo(userPayload) {
  return {
    type: GET_USER_INFO,
    payload: userPayload
  }
}

module.exports = {
  buyTradeAdvertisement: (buyTradeAdvertisements, buyTradeAdvertisementId, users) => (dispatch) => {
    var buyAdvertisement = buyTradeAdvertisements.data[buyTradeAdvertisementId]
    dispatch(setBuyTradeAdvertisement(buyAdvertisement))
    dispatch(setBuyer(users[buyAdvertisement.buyerUid]))
  },
  sellerCreatesPurchaseRequest: (seller, buyer, amount, buyTradeAdvertisementId, buyTradeAdvertisement, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    var sellerUsername = seller.proflie.username
    var postData = {
      amount: amount,
      //bankInformation: buyTradeAdvertisement.bankInformation, //this should be taken from the sellTradeAdvertisement when the seller confirms a trade
      buyerAddress: buyTradeAdvertisement.buyerAddress,
      buyerUsername: buyer.profile.username,
      buyerUid: buyTradeAdvertisement.buyerUid,
      tradeAdvertisementId: buyTradeAdvertisementId,
      buyer: buyer,
      //paymentMethod: buyTradeAdvertisement.paymentMethod, //this should be taken from the sellTradeAdvertisement when the seller confirms a trade
      price: buyTradeAdvertisement.price,
      sellerAddress: coinbase,
      sellerUid: seller.profile.uid,
      sellerUsername: seller.profile.username,
      sellrequesttime: new Date(),
      status: 'Initiated'
    }
    var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/sellerCreatesPurchaseRequest'
    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }
    request(options, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var headers = res.headers
      var statusCode = res.statusCode
      if(statusCode === 500) {
        console.error('Server responded with an error: ' + res.body.error);
        throw res.body.error
      }
      if(statusCode === 200) {
        console.log("ok got the 200")
        var _body = seller.proflie.username + " has confirmed your buy order"
        var _fcmToken
        if(buyer.profile.fcmToken){
          _fcmToken = buyer.fcmToken
        } else {
          _fcmToken = null
        }
        var purchaseRequestId = 'TODO'
        var notificationData = {
          "title": "New Seller Confirmation",
          "body": _body,
          "type": "accept-buy-order",
          "email": true,
          "fcm": true,
          "recipientToken": _fcmToken,
          "recipientEmail": buyer.email,
          "verifiedEmail": buyer.verifiedEmail,
          "senderUsername": seller.proflie.username,
          // TODO get the purchaseRequestId from the res.body
          "purchaseRequestId": purchaseRequestId,
          "seen": false,
          "createdAt": Date.now()
        }
        var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
        firebaseRef.database().ref('/users/'+buyer.data.uid+'/notifications/'+newNotifcation.key).set({vaule:true}) 
        browserHistory.push('/activetrade/' +  res.purchaseRequestId)
      }
    });
  },
  clearState: () => (dispatch) =>{
    dispatch(clearBuyer())
    dispatch(clearBuyTradeAdvertisement())
  }
}
