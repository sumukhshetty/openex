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

    try {
      var newRequest = firebaseRef.database().ref('/purchaserequests/' + seller.profile.country)
        .push(purchaseRequestData, function(err){
          console.log("about to add to activetrades")
          firebaseRef.database().ref('/users/'+ seller.data.uid+'/activetrades/'+newRequest.key).set({'tradeType': buyTradeAdvertisement.tradeType})
          firebaseRef.database().ref('/users/'+ buyTradeAdvertisement.buyerUid+'/activetrades/'+newRequest.key).set({'tradeType': buyTradeAdvertisement.tradeType})

          try {
            var _body = seller.profile.username + " has responded to your Buy Trade Advertisement"
            console.log(_body)
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
                "purchaseRequestId": newRequest.key,
                "seen": false,
                "createdAt": Date.now()
              }
              var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
              console.log(buyTradeAdvertisement.buyerUid)
              firebaseRef.database().ref('/users/'+buyTradeAdvertisement.buyerUid+'/notifications/'+newNotifcation.key).set({vaule:true})
            } catch (error) {
              console.log(error)
            }
          })
        } catch (error) {
          console.log(error)
        }
  },
  clearState: () => (dispatch) =>{
    dispatch(clearBuyer())
    dispatch(clearBuyTradeAdvertisement())
  }
}
