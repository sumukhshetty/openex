import {firebaseRef, FIREBASE_TIMESTAMP} from './../../index.js'
import * as purchaseRequestHelpers from './../../util/purchaseRequestHelpers'
import * as notificationHelpers from './../../util/notificationHelpers'
import { browserHistory } from 'react-router'
import {notify} from 'react-notify-toast'

import * as contractAbis from './../../contract_addresses/contractAbi'


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

function userOrderBook(orderBook) {
  return {
  type: 'SET_ETH_ODER_BOOK',
  payload: orderBook
  }
}

function setTxHash(txHash){
  return {
    type: 'SET_TX_HASH',
    payload: txHash
  }
}

function clearTxHash(){
  return{
    type: 'CLEAR_TX_HASH'
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
  sellerConfirmsTrade: (seller, buyer, purchaseRequest, purchaseRequestId, web3, ethOrderBook) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerConfirmsTrade")
    console.log(ethOrderBook)
    try {
      let etherAmount = web3.toWei(Number(purchaseRequest.etherAmount), 'ether');
      let fiatAmount = web3.toWei(purchaseRequest.fiatAmount)
      let price = web3.toWei(purchaseRequest.price)
      ethOrderBook.data.availableBalance(function(error, result){
        console.log(error, result)
        if(!error){
          // check if the request is greater than the available balance
          if(result.toNumber()>web3.toWei(Number(purchaseRequest.etherAmount*1.01), 'ether')){
            console.log("the availableBalance is greater than the purchase request")
            dispatch(sendEtherState('sending'));
            try {
              ethOrderBook.data.addOrder(purchaseRequestId, purchaseRequest.buyerAddress,
                etherAmount, price, purchaseRequest.currency, {from:web3.eth.coinbase},
                function(error, result){
                  if(!error){
                    console.log("we were able to add the order to the smart contract")
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
                      dispatch(sendEtherState('init'));
                      notificationHelpers.sendSellerConfirmsTradeNotification(seller, buyer, purchaseRequest, purchaseRequestId)

                    });
                    } else {
                      console.log(error)
                      dispatch(sendEtherState('init'));
                    }
                }
                )

            } catch (error) {
              console.log("there was an error with adding the order to the smart contract")
              console.log(error)
            }
          } else {
            console.log("we don't have enough ether in the contract")
            dispatch(sendEtherState('insufficient-available-balance'));
          }
        } else {
          console.log("ethOrderBook.data.availableBalance.error")
          dispatch(sendEtherState('init'));
          console.log(error)
        }
      })
    } catch (error) {
      console.log(error)
      console.log(error.message)
      if( error.message === "Cannot read property 'availableBalance' of null") {
        dispatch(sendEtherState('no-eth-order-book'));
      } else {
        console.log("there's a different error")
        console.log(error)
      }
    }

  },
  buyerConfirmsPayment: (buyer, seller, purchaseRequest, purchaseRequestId) => (dispatch) => {
    console.log("buyerConfirmsPayment")
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
  sellerReleasesEther: (seller, buyer, purchaseRequest, purchaseRequestId, web3, ethOrderBook) => (dispatch) => {
    dispatch(sendEtherState('sending'));
    ethOrderBook.data.completeOrder(purchaseRequestId, {from: web3.eth.coinbase}, function(error, result) {
      if(!error){
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
            dispatch(sendEtherState('init'));
            notificationHelpers.sendSellerReleasesEtherNotification(seller, buyer, purchaseRequest, purchaseRequestId)
          })
        // END FIREBASE STUFF
      } else {
        console.log(error)
      }
    })
    /*ethOrderBook.data.completeOrder(purchaseRequestId, {from: web3.eth.coinbase})
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
            dispatch(sendEtherState('init'));
            notificationHelpers.sendSellerReleasesEtherNotification(seller, buyer, purchaseRequest, purchaseRequestId)
          })
        // END FIREBASE STUFF
    }).catch(function(error) {
        dispatch(sendEtherState('init'));
    })*/
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

/*        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromDisputedTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

        firebaseRef.database().ref("users/" + purchaseRequest.buyerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)
        firebaseRef.database().ref("users/" + purchaseRequest.sellerUid+'/lastTransfer').set(FIREBASE_TIMESTAMP)

        */
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
  sellerAddsEther: (amount, uid, contractAddress, web3) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerAddsEther")

    try{
      var coinbase = web3.eth.coinbase;
      amount = Number(amount);
      let value = web3.toWei(amount, 'ether');
      dispatch(sendEtherState('sending'));
      web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function(err, txHash) {
        if(!err) {
          dispatch(sendEtherState('init'));
          /*firebaseRef.database().ref('/users/'+uid+'/balanceUpdateTx')
            .set(txHash);*/
        } else {
          if(err.message.includes('MetaMask Tx Signature: User denied')) {
            console.log('ERROR: User denied transaction');
            dispatch(sendEtherState('insufficient-available-balance'))
          } else {
            console.log(err);
            dispatch(sendEtherState('insufficient-available-balance'))
          }
        }
      })
    } catch(error){
      notify.show("Please unlock your MetaMask wallet")
      console.log("we should notify the user that their wallet is locked")
    }
  },
  sellerCreatesETHOrderBook: (web3, orderBookFactory, user) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerCreatesETHOrderBook")
    dispatch(sendEtherState('sending'));
    var event = orderBookFactory.data.ETHOrderBookCreated()
    // TODO add index to the ETHOrderBookCreated event in the smart contract and filter for the seller
    //var event = orderBookFactory.data.ETHOrderBookCreated({seller:web3.eth.coinbase})
    event.watch((error, result) => {
      console.log("ETHOrderBookCreated.watch")
      console.log(result.args.orderAddress)
      const ETHOrderBook = web3.eth.contract(contractAbis.ETHOrderBookAbi)
      const _instance = ETHOrderBook.at(result.args.orderAddress)

      // move this to the component will unmount for persistence
      firebaseRef.database().ref('/ethorderbook/'+user.profile.country+'/'+user.data.uid+'/orderBookAddress')
      .set(result.args.orderAddress)

      dispatch(userOrderBook(_instance))
      dispatch(sendEtherState('init'))
    })
    console.log(event)
    orderBookFactory.data.createETHOrderBook(user.profile.country, {from: web3.eth.coinbase}, function(error, result){
      if(!error){
        console.log("created ethorderbook")
        console.log(result)
        dispatch(sendEtherState('waiting-for-tx-to-mine'))
        dispatch(setTxHash(result))
        
        } else {
          console.log(error)
          dispatch(sendEtherState('init'))
        }
      })
  },
  clearState: () => (dispatch) => {
    dispatch(clearBuyer())
    dispatch(clearSeller())
    dispatch(clearTxHash())
    dispatch(clearActiveTrade())
  },
  resetEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  }
}
