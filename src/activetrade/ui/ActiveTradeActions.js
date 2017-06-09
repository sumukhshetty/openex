import {firebaseRef, FIREBASE_TIMESTAMP} from './../../index.js'
import * as purchaseRequestHelpers from './../../util/purchaseRequestHelpers'
<<<<<<< HEAD
import { browserHistory } from 'react-redux'
const request = require('request')
=======
import { browserHistory } from 'react-router'
>>>>>>> origin/master

function setActiveTrade(purchaseRequestPayload){
  return {
    type: 'SET_ACTIVE_TRADE',
    payload: purchaseRequestPayload
  }
}

export const SET_BUYER = 'SET_BUYER'
function setBuyer(buyerPayload){
  return {
    type: SET_BUYER,
    payload: buyerPayload
  }
}

function setSeller(sellerPayload){
  return {
    type: 'SET_SELLER',
    payload: sellerPayload
  }
}

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

function clearBuyer(){
  return {
    type: 'CLEAR_BUYER',
    payload: null
  }
}

function clearSeller(){
  return {
    type: 'CLEAR_SELLER',
    payload: null
  }
}

function clearActiveTrade(){
  return {
    type: 'CLEAR_ACTIVE_TRADE',
    payload: null
  }
}


module.exports = {
  activeTrade: (purchaseRequests, purchaseRequestId, users, user) => (dispatch) => {
    firebaseRef.database().ref('/purchaserequests/'+user.profile.country+'/'+purchaseRequestId).on('value', function(snap){
      var activeTrade = snap.val()
      dispatch(setActiveTrade(activeTrade))
      dispatch(setBuyer(users.data[activeTrade.buyerUid]))
      dispatch(setSeller(users.data[activeTrade.sellerUid]))
    })
  },
  sellerConfirmsTrade: (seller, purchaseRequest, purchaseRequestId, web3, orderBook) => (dispatch) => {
    // ISSUE-242: call on ETHOrderBook.addOrder when the seller confirms the trade
    let coinbase = web3.eth.coinbase;
    //string uid, address buyer, uint amount, uint price, string currency
    orderBook.addOrder(purchaseRequestId, purchaseRequest.buyerAddress, web3.toWei(purchaseRequest.etherAmount, 'ether'), purchaseRequest.price, purchaseRequest.currency, {from: coinbase})
    .then(function(txHash) {
      //call firebase function here
      //event OrderAdded(string uid, address seller, address buyer, uint amount, uint price, string currency);
      request({
        method: 'post',
        body: {
          purchaseRequestId: purchaseRequestId,
          txHash: txHash['tx'],
          contractAddress: txHash['logs'][0]['args']['orderAddress'],
          buyerAddress: purchaseRequest.buyerAddress,
          amount: web3.toWei(purchaseRequest.etherAmount, 'ether'),
          price: purchaseRequest.price,
          currency: purchaseRequest.currency
        },
        json: true,
        url: 'https://us-central1-automteetherexchange.cloudfunctions.net/confirmTrade'
      },
      function(err, res, body) {
        if (err) {
          console.error('error posting json: ', err)
          throw err
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
        }
        if(res.statusCode === 200) {

        }
      })
    })
    .catch(function(error) {
      console.log('[ActiveTradeActions.sellerConfirmsTrade] error: ' + error);
    });

    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        lastUpdated: now.toUTCString(),
        sellerconfirmtime: now.toUTCString(),
        status: 'Awaiting Payment'
      })
    firebaseRef.database().ref('/purchaserequests/' + seller.country + '/' + purchaseRequestId)
    .set(updatedPurchaseRequest, function(error){
      if(error){
        console.log(error)
      }
    });
  },
  buyerConfirmsPayment: (buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        buyerconfirrmpaymenttime: now.toUTCString(),
        lastUpdated: now.toUTCString(),
        status: 'Awaiting Release'
      })
    firebaseRef.database().ref('/purchaserequests/'+buyer.country+'/'+ purchaseRequestId)
      .set(updatedPurchaseRequest, function(error){
        if(error){
          console.log(error)
        }
      });
  },
  sellerReleasesEther: (seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    // ISSUE-243 call on ETHOrderBook.completeOrder when the seller releases the ether
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        lastUpdated: now.toUTCString(),
        sellerreleaseethertime: now.toUTCString(),
        status: 'All Done'
    })
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId)
          .set(updatedPurchaseRequest)

  },
  tradePostProcessing: (user, purchaseRequest, purchaseRequestId, users) => {
    console.log('ActiveTradeActions.tradePostProcessing')
      if (!purchaseRequest.postProcessingCompleted){
        purchaseRequestHelpers.updateUserTradingStats(purchaseRequest, purchaseRequest.buyerUid, users)
        purchaseRequestHelpers.updateUserTradingStats(purchaseRequest, purchaseRequest.sellerUid, users)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        firebaseRef.database().ref('/purchaserequests/' + user.profile.country + '/' + purchaseRequestId + '/postProcessingCompleted').set(true)
      }
  },
  sellerCancelsTrade:(seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerCancelsTrade")
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
            purchaseRequest, {
              sellercancelstime: now.toUTCString(),
              status: 'Seller Canceled Trade',
              lastUpdated: now.toUTCString()
            })
    console.log(updatedPurchaseRequest)
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId)
          .set(updatedPurchaseRequest)
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

          });
  },
  buyerCancelsTrade:(buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
            purchaseRequest, {
              buyercancelstime: now.toUTCString(),
              status: 'Buyer Canceled Trade',
              lastUpdated: now.toUTCString()
            })
    firebaseRef.database().ref('/purchaserequests/'+buyer.country+'/'+ purchaseRequestId)
          .set(updatedPurchaseRequest)
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

          });
  },
  sellerRaisesDispute: (seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.sellerRaisesDispute")
    console.log(seller, purchaseRequest, purchaseRequestId)
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        sellerraisesdisputetime: now.toUTCString(),
        status: 'Seller Raised Dispute',
        lastUpdated: now.toUTCString()
      })

    firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId)
          .set(updatedPurchaseRequest)
          .then(function() {
            purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

          });
  },
  buyerRaisesDispute: (buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("activetrade.ui.buyerRaisesDispute")
    console.log(buyer, purchaseRequest, purchaseRequestId)
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        buyraisesdisputetime: now.toUTCString(),
        status: 'Buyer Raised Dispute',
        lastUpdated: now.toUTCString()
      })
    firebaseRef.database().ref('/purchaserequests/'+ buyer.country + '/' + purchaseRequestId)
      .set(updatedPurchaseRequest)
      .then(function() {
        purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

      });
  },
  arbiterReleasesToSeller: (seller, arbiter, purchaseRequest, purchaseRequestId) => (dispatch) => {
    // ISSUE-244: call on ETHOrderBook.resolveDisputeSeller when the arbiter votes for the seller
    firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId + '/status')
      .set('All Done')
      .then(function() {
/*        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

        firebaseRef.database().ref("users/"+purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
        firebaseRef.database().ref("users/"+purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)*/

        browserHistory.push('/dashboard')
      });
  },
  arbiterReleasesToBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId) => (dispatch) =>{
    // ISSUE-245: call on ETHOrderBook.resolveDisputeBuyer when the arbiter votes for the buyer
    firebaseRef.database().ref('/purchaserequests/'+ buyer.country + '/' + purchaseRequestId + '/status')
      .set('All Done')
      .then(function() {
/*        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

        firebaseRef.database().ref("users/" + purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
<<<<<<< HEAD
        firebaseRef.database().ref("users/" + purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)

=======
        firebaseRef.database().ref("users/" + purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)*/
        
>>>>>>> origin/master
        browserHistory.push('/dashboard')
      });
  },
  sellerRatesBuyer: (rating, purchaseRequestId, purchaseRequest) => (dispatch) => {
    //excellent place for a firebase cloud functions onWrite
    console.log('sellerRatesBuyer')
    firebaseRef.database().ref('/traderating/' + purchaseRequest.buyerUid + '/' + purchaseRequestId)
      .set({rating: rating})
      .then(function(){
        //this needs to be moved when the trade feedback component unmounts
        firebaseRef.database().ref('/traderating/'+ purchaseRequest.buyerUid).once('value',function(snap){
          var totalRating = 0
          var ratings = snap.val()
          console.log(ratings)
          Object.entries(ratings).forEach(
            ([key,value])=>{
              totalRating += value.rating
            })
          console.log(totalRating)
          console.log(Object.keys(ratings).length)
          var averageFeedback = totalRating/(Object.keys(ratings).length)
          console.log(averageFeedback)
          firebaseRef.database().ref('/users/'+ purchaseRequest.buyerUid + '/avgFeedback').set(averageFeedback.toFixed(1))
        })
    })
  },
  buyerRatesSeller: (rating, purchaseRequestId, purchaseRequest)  => (dispatch) => {
    console.log('buyerRatesSeller')
    firebaseRef.database().ref('/traderating/' + purchaseRequest.sellerUid + '/' + purchaseRequestId)
      .set({rating: rating})
      .then(function(){
        //this needs to be moved when the trade feedback component unmounts
        firebaseRef.database().ref('/traderating/'+ purchaseRequest.sellerUid).once('value',function(snap){
          var totalRating = 0
          var ratings = snap.val()
          console.log(ratings)
          Object.entries(ratings).forEach(
            ([key,value])=>{
              totalRating += value.rating
            })
          console.log(totalRating)
          console.log(Object.keys(ratings).length)
          var averageFeedback = totalRating/(Object.keys(ratings).length)
          console.log(averageFeedback)
          firebaseRef.database().ref('/users/'+purchaseRequest.sellerUid + '/avgFeedback').set(averageFeedback.toFixed(1))
        })
      })
  },
  clearState: () => (dispatch) => {
    dispatch(clearBuyer())
    dispatch(clearSeller())
    dispatch(clearActiveTrade())
  },
  resetEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  }
}
