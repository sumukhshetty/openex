import {firebaseRef, FIREBASE_TIMESTAMP} from './../../index.js'
import * as purchaseRequestHelpers from './../../util/purchaseRequestHelpers'
import * as notificationHelpers from './../../util/notificationHelpers'
import { browserHistory } from 'react-router'

import ETHOrderBook from './../../../contracts/abi/ETHOrderBook'
import factoryAddress from './../../contract_addresses/orderfactory.js'
const contract = require('truffle-contract')


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
  sellerConfirmsTrade: (seller, buyer, purchaseRequest, purchaseRequestId, web3) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerConfirmsTrade")
    console.log(seller)
    console.log(purchaseRequest)
    console.log(typeof(web3.eth.coinbase))
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
      notificationHelpers.sendSellerConfirmsTradeNotification(seller, buyer, purchaseRequest, purchaseRequestId)

    });
    // ISSUE-242: call on ETHOrderBook.addOrder when the seller confirms the trade
    /*const orderBook = contract(ETHOrderBook);
    orderBook.setProvider(web3.currentProvider);
    orderBook.at(seller.orderBookAddress)
    .then(function(_orderBook){
      console.log(_orderBook)
      //function addOrder(string uid, address buyer, uint amount, uint price, string currency)
      _orderBook.addOrder(purchaseRequest.buyerUid, 
        purchaseRequest.buyerAddress, 
        Number(purchaseRequest.etherAmount),
        Number(purchaseRequest.fiatAmount),
        seller.currency, {from: web3.eth.coinbase})
      .then(function(txHash){
        
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
          notificationHelpers.sendSellerConfirmsTradeNotification(seller, buyer, purchaseRequest, purchaseRequestId)

        });
        
        })
    })
    */
  },
  buyerConfirmsPayment: (buyer, seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
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
        notificationHelpers.sendBuyerConfirmsPaymentNotification(buyer,seller,purchaseRequest,purchaseRequestId)
      });
  },
  sellerReleasesEther: (seller, buyer, purchaseRequest, purchaseRequestId, web3) => (dispatch) => {
    // ISSUE-243 call on ETHOrderBook.completeOrder when the seller releases the ether
    /*const orderBook = contract(ETHOrderBook);
    orderBook.setProvider(web3.currentProvider);
    orderBook.at(seller.orderBookAddress)
    .then(function(_orderBook){
      console.log(_orderBook)
      // function completeOrder(string uid)
      _orderBook.completeOrder(purchaseRequest.buyerUid, {from: web3.eth.coinbase})
      .then(function(txHash){
        // START FIREBASE STUFF
        var now = new Date()
        var updatedPurchaseRequest = Object.assign({},
          purchaseRequest, {
            lastUpdated: now.toUTCString(),
            sellerreleaseethertime: now.toUTCString(),
            status: 'All Done'
        })
        firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId)
          .set(updatedPurchaseRequest, function(error){
            notificationHelpers.sendSellerReleasesEtherNotification(seller, buyer, purchaseRequest, purchaseRequestId)
          })
        // END FIREBASE STUFF

        })
    })
    */    
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
      purchaseRequest, {
        lastUpdated: now.toUTCString(),
        sellerreleaseethertime: now.toUTCString(),
        status: 'All Done'
    })
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId)
      .set(updatedPurchaseRequest, function(error){
        notificationHelpers.sendSellerReleasesEtherNotification(seller, buyer, purchaseRequest, purchaseRequestId)
      })

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
  arbiterReleasesToSeller: (seller, arbiter, purchaseRequest, purchaseRequestId, web3) => (dispatch) => {
    // ISSUE-244: call on ETHOrderBook.resolveDisputeSeller when the arbiter votes for the seller
    /*const orderBook = contract(ETHOrderBook);
    orderBook.setProvider(web3.currentProvider);
    orderBook.at(seller.orderBookAddress)
    .then(function(_orderBook){
      console.log(_orderBook)
      // function resolveDisputeSeller(string uid)
      _orderBook.resolveDisputeSeller(purchaseRequest.buyerUid, {from: web3.eth.coinbase})
      .then(function(txHash){
        // START FIREBASE STUFF
        firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId + '/status')
          .set('All Done')
          .then(function() {
            browserHistory.push('/dashboard')
          });
        // END FIREBASE STUFF

        })
    })
    */     
    firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId + '/status')
      .set('All Done')
      .then(function() {
        browserHistory.push('/dashboard')
      });
  },
  arbiterReleasesToBuyer: (buyer, arbiter, purchaseRequest, purchaseRequestId, web3) => (dispatch) =>{
    // ISSUE-245: call on ETHOrderBook.resolveDisputeBuyer when the arbiter votes for the buyer

    /*const orderBook = contract(ETHOrderBook);
    orderBook.setProvider(web3.currentProvider);
    orderBook.at(seller.orderBookAddress)
    .then(function(_orderBook){
      console.log(_orderBook)
      // function resolveDisputeBuyer(string uid)
      _orderBook.resolveDisputeBuyer(purchaseRequest.buyerUid, {from: web3.eth.coinbase})
      .then(function(txHash){
        // START FIREBASE STUFF
        firebaseRef.database().ref('/purchaserequests/'+ seller.country + '/' + purchaseRequestId + '/status')
          .set('All Done')
          .then(function(){
            browserHistory.push('/dashboard')
          })
        // END FIREBASE STUFF

        })
    })
    */ 

    firebaseRef.database().ref('/purchaserequests/'+ buyer.country + '/' + purchaseRequestId + '/status')
      .set('All Done')
      .then(function() {
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
