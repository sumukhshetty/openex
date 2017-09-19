//const request = require('request')
import {firebaseRef} from './../../index.js'
import * as notificationHelpers from './../../util/notificationHelpers'

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
  buyerCreatesPurchaseRequest: (etherAmount, fiatAmount, etherPrice, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyer) => (dispatch) => {
    var now = new Date()
    if(Number.isNaN(fiatAmount)) {
      throw new Error('fiatAmount isNaN')
    }
    var purchaseRequestData = {
      bankinformation: sellTradeAdvertisement.bankInformation,
      buyerAddress: buyer.data.uid,
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
      postProcessingCompleted: false,
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
    var newRequest = firebaseRef.database().ref('/purchaserequests/' + buyer.profile.country)
      .push(purchaseRequestData, function(err){
        firebaseRef.database().ref('/users/' + sellTradeAdvertisement.sellerUid + '/activetrades/' + newRequest.key).set({'tradeType': sellTradeAdvertisement.tradeType})
        firebaseRef.database().ref('/users/'+ buyer.data.uid+'/activetrades/'+newRequest.key).set({'tradeType': sellTradeAdvertisement.tradeType})

        notificationHelpers.sendBuyerCreatesPurchaseRequestNotification(purchaseRequestData, newRequest.key, sellTradeAdvertisementId, sellTradeAdvertisement, seller, buyer)

      })
  },
  clearState: () => (dispatch) => {
    dispatch(clearSeller())
    dispatch(clearSellTradeAdvertisement())
  }
}
