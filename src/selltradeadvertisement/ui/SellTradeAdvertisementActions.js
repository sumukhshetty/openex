//const request = require('request')
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
    var sellTradeAdvertisement = sellTradeAdvertisements.data[sellTradeAdvertisementId]
    dispatch(setSellTradeAdvertisement(sellTradeAdvertisement))
    dispatch(setSeller(users.data[sellTradeAdvertisement.sellerUid]))
  },
  buyerCreatesPurchaseRequest: (etherAmount, fiatAmount, etherPrice, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyerAddress, buyer) => (dispatch) => {
    var now = new Date()
    var purchaseRequestData = {
      bankinformation: sellTradeAdvertisement.bankInformation,
      buyerAddress: buyerAddress,
      buyerUid: buyer.data.uid,
      buyerUsername: buyer.profile.username,
      // TODO get the contract address from the user
      contractAddress: 'TODO',
      currency: buyer.profile.currency,
      createdAt: now.toUTCString(),
      etherAmount: etherAmount,
      fiatAmount: fiatAmount,
      lastUpdated: now.toUTCString(),
      paymentMethod: sellTradeAdvertisement.paymentMethod,
      price: etherPrice,
      sellerAddress: sellTradeAdvertisement.sellerAddress,
      sellerUid: sellTradeAdvertisement.sellerUid,
      sellerUsername: sellTradeAdvertisement.sellerUsername,
      status: 'Awaiting Seller Confirmation',
      tradeAdvertisementId: sellTradeAdvertisementId,
      tradeAdvertisementType: sellTradeAdvertisement.tradeType,
      // TODO update the txHash when the seller confirm
      txHash: 'TODO',
      buyercancelstime: '-',
      buyerrequesttime: '-',
      sellrequesttime: now.toUTCString(),
      sellercancelstime: '-',
      sellerconfirmtime: '-',
      buyerconfirrmpaymenttime: '-',
      sellerreleaseethertime: '-',
      buyraisesdisputetime: '-',
      sellerraisesdisputetime: '-'
    }
/*    var postData = {
      sellTradeAdvertisementId: sellTradeAdvertisementId,
      sellTradeAdvertisement: sellTradeAdvertisement,
      seller: seller,
      buyer: buyer
    }*/
/*    var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/buyerCreatesPurchaseRequest'
    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }*/
    var newRequest = firebaseRef.database().ref('/purchaserequests/' + buyer.profile.country)
      .push(purchaseRequestData, function(err){
        firebaseRef.database().ref('/users/' + sellTradeAdvertisement.sellerUid + '/activetrades/' + newRequest.key).set({'tradeType': sellTradeAdvertisement.tradeType})
        firebaseRef.database().ref('/users/'+ buyer.data.uid+'/activetrades/'+newRequest.key).set({'tradeType': sellTradeAdvertisement.tradeType})
      })

      //TODO implement this with firebase functions and send notification
    /*request(options, function(err, res, body){
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
    })*/
  },
  clearState: () => (dispatch) => {
    dispatch(clearSeller())
    dispatch(clearSellTradeAdvertisement())
  }
}