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


module.exports = {
  buyTradeAdvertisement: (buyTradeAdvertisements, buyTradeAdvertisementId, users) => (dispatch) => {
    var buyAdvertisement = buyTradeAdvertisements.data[buyTradeAdvertisementId]
    dispatch(setBuyTradeAdvertisement(buyAdvertisement))
    dispatch(setBuyer(users.data[buyAdvertisement.buyerUid]))
  },
  sellerCreatesPurchaseRequest: (etherAmount, fiatAmount, etherPrice, buyTradeAdvertisementId, buyTradeAdvertisement, buyer, sellerAddress, seller) => (dispatch) => {
    var now = new Date()
    var purchaseRequestData = {
      bankinformation:'Request the bank information from the seller in chat.', //need to set this to the user's profile. the 
      buyerAddress: buyTradeAdvertisement.buyerAddress,
      buyerUid: buyTradeAdvertisement.buyerUid,
      buyerUsername: buyer.data.username,
      // TODO get the contractAddress
      contractAddress:'TODO', 
      currency: buyer.data.currency,
      createdAt:now.toUTCString(),
      etherAmount: etherAmount,
      fiatAmount: fiatAmount,
      lastUpdated: now.toUTCString(),
      paymentMethod: 'Request the paymentMethod from the seller in chat.', //need to get this from the seller's profile
      price: etherPrice,
      postProcessingCompleted: false,
      sellerAddress:sellerAddress,
      sellerUid:seller.data.uid,
      sellerUsername:seller.profile.username,
      status:'Awaiting Seller Confirmation',
      tradeAdvertisementId: buyTradeAdvertisementId,
      tradeAdvertisementType: buyTradeAdvertisement.tradeType,
      txHash: 'TODO', //added when the seller confirms the trade
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
      //amount: amount,
      //bankInformation: buyTradeAdvertisement.bankInformation, //this should be taken from the sellTradeAdvertisement when the seller confirms a trade
      buyerAddress: buyTradeAdvertisement.buyerAddress,
      buyerUsername: buyer.data.username,
      buyerUid: buyTradeAdvertisement.buyerUid,
      tradeAdvertisementId: buyTradeAdvertisementId,
      buyer: buyer,
      //paymentMethod: buyTradeAdvertisement.paymentMethod, //this should be taken from the sellTradeAdvertisement when the seller confirms a trade
      price: buyTradeAdvertisement.price,
      //sellerAddress: coinbase,
      sellerUid: seller.profile.uid,
      sellerUsername: seller.profile.username,
      sellrequesttime: new Date().toUTCString(),
      status: 'Initiated'
    }
    var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/sellerCreatesPurchaseRequest'*/
/*    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }*/
    var newRequest = firebaseRef.database().ref('/purchaserequests/' + seller.profile.country)
      .push(purchaseRequestData, function(err){
        firebaseRef.database().ref('/users/'+ seller.data.uid+'/activetrades/'+newRequest.key).set({'tradeType': buyTradeAdvertisement.tradeType})
        firebaseRef.database().ref('/users/'+ buyTradeAdvertisement.buyerUid+'/activetrades/'+newRequest.key).set({'tradeType': buyTradeAdvertisement.tradeType})   
      })
/*    request(options, function (err, res, body) {
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
    });*/
  },
  clearState: () => (dispatch) =>{
    dispatch(clearBuyer())
    dispatch(clearBuyTradeAdvertisement())
  }
}
