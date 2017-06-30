import {firebaseRef, FIREBASE_TIMESTAMP, raven} from './../../index.js'
import * as purchaseRequestHelpers from './../../util/purchaseRequestHelpers'
import * as notificationHelpers from './../../util/notificationHelpers'
import { browserHistory } from 'react-router'
import {notify} from 'react-notify-toast'
import * as contractAbis from './../../contract_addresses/contractAbi'
import * as orderFactory from './../../contract_addresses/orderfactory'

var ethUtil = require('ethereumjs-util')



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
  type: 'SET_ETH_ORDER_BOOK',
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

function updateConfirmButtonIsDisabled(value){
  console.log('ActiveTradeActions.updateConfirmButtonIsDisabled')
  console.log(value)
  return {
    type: 'UPDATE_CONFIRM_BUTTON_IS_DISABLED',
    payload: value
  }
}

module.exports = {
  activeTrade: (purchaseRequests, purchaseRequestId, users, user) => (dispatch) => {
    firebaseRef.database().ref('/purchaserequests/'+user.profile.country+'/'+purchaseRequestId).on('value', function(snap){
      var activeTrade = snap.val()
      dispatch(setActiveTrade(activeTrade))
      dispatch(updateConfirmButtonIsDisabled(false))
      dispatch(setBuyer(users.data[activeTrade.buyerUid]))
      dispatch(setSeller(users.data[activeTrade.sellerUid]))
    })
  },
  sellerConfirmsTrade: (seller, buyer, purchaseRequest, purchaseRequestId, web3, ethOrderBook) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerConfirmsTrade")
    dispatch(updateConfirmButtonIsDisabled(true))
    try {
      let etherAmount = web3.toWei(Number(purchaseRequest.etherAmount), 'ether');
      let fiatAmount = web3.toWei(purchaseRequest.fiatAmount)
      let price = web3.toWei(purchaseRequest.price)
      if(web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error('Wallet Address Undefined')
      }
/*      
      // START NO-SMART CONTRACT
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
        dispatch(clearTxHash())
        dispatch(updateConfirmButtonIsDisabled(false))
        notificationHelpers.sendSellerConfirmsTradeNotification(seller, buyer, purchaseRequest, purchaseRequestId)              
        //event.stopWatching()
      })
      // END NO-SMART CONTRACT
*/
      // START WEB3
      ethOrderBook.data.availableBalance(function(error, result){
        if(!error){
          // check if the request is greater than the available balance
          if(result.toNumber()>web3.toWei(Number(purchaseRequest.etherAmount*1.01), 'ether')){
            console.log("the availableBalance is greater than the purchase request")
            dispatch(sendEtherState('sending'));
            var event = ethOrderBook.data.OrderAdded()
            event.watch((error, result) => {
              // the order was added do stuff
              console.log('addOrder.event.watch')
              console.log(error,result)
              console.log("we were able to add the order to the smart contract")
              // START FIREBASE
              var now = new Date()
              var updatedPurchaseRequest = Object.assign({},
                purchaseRequest, {
                  lastUpdated: now.toUTCString(),
                  sellerconfirmtime: now.toUTCString(),
                  status: 'Awaiting Payment',
                  contractAddress: ethOrderBook.data.address
                })
              firebaseRef.database().ref('/purchaserequests/' + seller.country + '/' + purchaseRequestId)
              .set(updatedPurchaseRequest, function(error){
                if(error){
                  console.log(error)
                }
                dispatch(sendEtherState('init'));
                dispatch(clearTxHash())
                dispatch(updateConfirmButtonIsDisabled(false))
                notificationHelpers.sendSellerConfirmsTradeNotification(seller, buyer, purchaseRequest, purchaseRequestId)              
                event.stopWatching()
              })
              // END FIREBASE
            })
            console.log(purchaseRequest.buyerAddress)
            console.log(purchaseRequestId)
            ethOrderBook.data.addOrder(purchaseRequestId, purchaseRequest.buyerAddress,
              etherAmount, price, purchaseRequest.currency, {from:coinbase},
              function(error, result){
                if(!error){
                  console.log("ethOrderBook.data.addOrder")
                  dispatch(sendEtherState('waiting-for-tx-to-mine'))
                  dispatch(setTxHash(result))
                  }else {
                    console.log(ethOrderBook.data.addOrder)
                    console.log(error)
                    dispatch(sendEtherState('init'));
                    dispatch(updateConfirmButtonIsDisabled(false))
                  }
              })
          } else {
            console.log("we don't have enough ether in the contract")
            dispatch(sendEtherState('insufficient-available-balance'));
          }
        } else {
          console.log("ethOrderBook.data.availableBalance.error")
          dispatch(sendEtherState('init'));
          dispatch(updateConfirmButtonIsDisabled(false))
          console.log(error)
          raven.captureException(error)
        }
      })
      // END WEB3
    } catch (error) {
      console.log(error)
      if( error.message === "Cannot read property 'availableBalance' of null") {
        dispatch(sendEtherState('no-eth-order-book'));
      } else if (error.message === '"Wallet Address Undefined"') {
        console.log("Wallet Address Undefined")
        console.log(error)
        notify.show("please unlock metmask")
      } else {
        raven.captureException(error)
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
    console.log("sellerReleasesEther")
    try{
      if(web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
        console.log(coinbase)
      } else {
        throw new Error("Wallet Address Undefined")
      }
      dispatch(sendEtherState('sending'));
      console.log(purchaseRequestId)
/*
      // START NO-SMART-CONTRACT
      var now = new Date()
      var updatedPurchaseRequest = Object.assign({},
        purchaseRequest, {
          lastUpdated: now.toUTCString(),
          sellerconfirmtime: now.toUTCString(),
          status: 'All Done'
        })
      console.log(updatedPurchaseRequest)
      firebaseRef.database().ref('/purchaserequests/' + seller.country + '/' + purchaseRequestId)
      .set(updatedPurchaseRequest, function(error){
        if(error){
          console.log(error)
        }
        dispatch(sendEtherState('init'));
        dispatch(clearTxHash())
        dispatch(updateConfirmButtonIsDisabled(false))
        notificationHelpers.sendSellerReleasesEtherNotification(seller, buyer, purchaseRequest, purchaseRequestId)              
        //event.stopWatching()
      })
      // END NO-SMART-CONTRACT 
*/
      // START WEB3
      var event = ethOrderBook.data.OrderCompleted()
      event.watch((error,result) => {
        console.log('event.OrderCompleted')
        console.log(error,result)
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
              event.stopWatching()
              notificationHelpers.sendSellerReleasesEtherNotification(seller, buyer, purchaseRequest, purchaseRequestId)
            })

          // END FIREBASE STUFF
        } else {
          raven.captureException(error)
        }

      })
      ethOrderBook.data.completeOrder(purchaseRequestId, {from: coinbase}, function(error, result) {
        if(!error){
          console.log('ethOrderBook.data.completeOrder')
          dispatch(sendEtherState('waiting-for-tx-to-mine'))
          dispatch(setTxHash(result))
        } else {
          //dispatch(sendEtherState('error-with-tx'))
          console.log(error)
          console.log(result)
          dispatch(sendEtherState('init'));
        }
      })
      // END WEB3
    } catch (error){
      if(error.message==='Wallet Address Undefined'){
        notify.show("Please unlock your MetaMask Account")
      } else {
        raven.captureException(error)
      }
    }
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
  arbiterReleasesToSeller: (seller, buyer, arbiter, purchaseRequest, purchaseRequestId, web3) => (dispatch) => {
    console.log('ActiveTradeActions.arbiterReleasesToSeller')
    try {
      if (web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Wallet Address Undefined")
      }
      if (!ethUtil.isValidAddress(orderFactory.kovanDisputeResolver)) {
        throw new Error("Invalid address")
      } else {
        const DisputeResolver = web3.eth.contract(contractAbis.DisputeResolver)
        const _instance = DisputeResolver.at(orderFactory.kovanDisputeResolver)
        var event = _instance.DisputeResolved()
        console.log(_instance)
        //dispatch(setETHOrderBook(_instance))
        event.watch((error, result) => {
          console.log("ActiveTradeActions.arbiterReleasesToSeller")
          console.log(error, result)
          if(!error){
            // update the status of the trade to all done
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
                event.stopWatching()
                notificationHelpers.sendArbiterReleasesToSeller(seller, buyer, purchaseRequest, purchaseRequestId)
              })
/*            firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId+'/status').update('All Done')
            // send a notification to the buyer and the seller
            notificationHelpers.sendArbiterReleasesToSeller(seller, buyer, purchaseRequest, purchaseRequestId)
            event.stopWatching()*/
          } else {
            dispatch(sendEtherState('init'));
            raven.captureException(error)
          }
        })
        _instance.resolveDisputeSeller(purchaseRequestId,{from:coinbase}, function(error, result){
          if(!error) {
            dispatch(sendEtherState('waiting-for-tx-to-mine'))
            dispatch(setTxHash(result))
          } else {
            console.log(error)
            dispatch(sendEtherState('init'))
          }

        })
      }
    } catch (error) {
      if(error.message==='Wallet Address Undefined'){
        notify.show("Please unlock your MetaMask Account")
      } else {
        console.log(error)
        raven.captureException(error)

      }
    }
  },
  arbiterReleasesToBuyer: (buyer, seller, arbiter, purchaseRequest, purchaseRequestId, web3) => (dispatch) =>{
    console.log("ActiveTradeActions.arbiterReleasesToBuyer")
    try {
      if (web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Wallet Address Undefined")
      }
      if (!ethUtil.isValidAddress(orderFactory.kovanDisputeResolver)){
        throw new Error("Invalid address")
      } else {
        const DisputeResolver = web3.eth.contract(contractAbis.DisputeResolver)
        const _instance = DisputeResolver.at(orderFactory.kovanDisputeResolver)
        var event = _instance.DisputeResolved()
        event.watch((error, result) => {
          console.log("ActiveTradeActions.arbiterReleasesToSeller")
          console.log(event, result)
          // update the status of the trade to all done
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
              event.stopWatching()
              notificationHelpers.sendArbiterReleasesToBuyer(seller, buyer, purchaseRequest, purchaseRequestId)
            })
          /*firebaseRef.database().ref('/purchaserequests/'+buyer.country+'/'+purchaseRequestId+'/status').update('All Done')
          // send a notification to the buyer and the seller
          notificationHelpers.sendArbiterReleasesToBuyer(seller, buyer, purchaseRequest, purchaseRequestId)
          event.stopWatching()*/
        })
        console.log("about to resolve to buyer")
        _instance.resolveDisputeBuyer(purchaseRequestId,{from:coinbase}, function(error, result){
          if(!error) {
            console.log(result)
            dispatch(sendEtherState('waiting-for-tx-to-mine'))
            dispatch(setTxHash(result))
          } else {
            console.log(error)
            dispatch(sendEtherState('init'))
          }

        })
      }
    } catch (error) {
      if(error.message==='Wallet Address Undefined'){
        notify.show("Please unlock your MetaMask Account")
      } else {
        raven.captureException(error)
      }
    }
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
      if(web3.eth.coinbase) {
        var coinbase = web3.eth.coinbase;
      } else {
        throw new Error("Wallet Address Undefined")
      }
      if (contractAddress && ((typeof contractAddress)==="string") && (contractAddress.length === 42)) {
        amount = Number(amount);
        let value = web3.toWei(amount, 'ether');
        dispatch(sendEtherState('sending'));
        web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function(err, txHash) {
          if(!err) {
            dispatch(sendEtherState('init'));
            dispatch(updateConfirmButtonIsDisabled(false))
            // TODO double check that this is the implementation we want
            /*web3.eth.getTransactionReceipt(txHash, function(txReceipt){
              console.log("got the tx txReceipt")
              dispatch(sendEtherState('init'));
              dispatch(updateConfirmButtonIsDisabled(false))
            })*/
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

      } else {
        console.log("invalid contract address")
        throw new Error("Invalid Contract Address")
      }

    } catch (error) {
      if (error.message === 'Wallet Address Undefined'){
        notify.show("Please unlock your MetaMask Account")
      }
      else if (error.message === 'Invalid Contract Address'){
        console.log('Invalid Contract Address')
        raven.captureException(error)
      }
      else {
        raven.captureException(error) 
      }

    }
  },
  sellerCreatesETHOrderBook: (web3, orderBookFactory, user) => (dispatch) => {
    console.log("ui.ActiveTradeActions.sellerCreatesETHOrderBook")
    try {
      if (web3.eth.coinbase) {
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Undefined Wallet Address")        
      }
      var event = orderBookFactory.data.ETHOrderBookCreated({seller:coinbase})
      event.watch((error, result) => {
        const ETHOrderBook = web3.eth.contract(contractAbis.ETHOrderBookAbi)
        const _instance = ETHOrderBook.at(result.args.orderAddress)

        // move this to the component will unmount for persistence
        firebaseRef.database().ref('/ethorderbook/'+user.profile.country+'/'+user.data.uid+'/orderBookAddress')
        .set(result.args.orderAddress)
        event.stopWatching()
        dispatch(userOrderBook(_instance))
        dispatch(sendEtherState('init'))
        dispatch(updateConfirmButtonIsDisabled(false))
        dispatch(clearTxHash())
      })
      dispatch(sendEtherState('sending'));
      orderBookFactory.data.createETHOrderBook(user.profile.country, {from: coinbase}, function(error, result){
        if(!error){
          dispatch(sendEtherState('waiting-for-tx-to-mine'))
          dispatch(setTxHash(result))
          
          } else {
            console.log(error)
            dispatch(sendEtherState('init'))
            dispatch(updateConfirmButtonIsDisabled(false))
          }
        })
    } catch (error) {
      console.log(error)
      if(error.message === 'Undefined Wallet Address'){
        notify.show("Please unlock your MetaMask account")
      } else {
        raven.captureException(error)
      }
    }
  },
  assignArbiter:(user, buyer, seller, purchaseRequest, purchaseRequestId, web3) => (dispatch)=>{
  try {
      if (web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Wallet Address Undefined")
      }
      if (!ethUtil.isValidAddress(purchaseRequest.contractAddress)) {
        throw new Error("Invalid address")
      } else {
        // get the dispute resolver contract
        const DisputeResolver = web3.eth.contract(contractAbis.DisputeResolver)
        const _instance = DisputeResolver.at(orderFactory.kovanDisputeResolver)
        // create an event, on the callback of the event do somme firebase stuff
        var event = _instance.DisputeAssigned()
        event.watch((error, result) => {
          console.log("ActiveTradeActions.assignArbiter.watch")
          console.log(error, result)
          if(!error){
            // update the status of the trade to all done
            firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId+'/aribiterUid').set(coinbase)
            // send a notification to the buyer and the seller
            event.stopWatching()
          } else {
            dispatch(sendEtherState('init'));
            raven.captureException(error)
          }
        })
        // call on the assign arbiter function
        _instance.assignDispute(purchaseRequest.contractAddress, purchaseRequestId, coinbase, {from:coinbase}, function(error, result){
          if(!error) {
            console.log("ok we've assigned the dispute")
            console.log(result)
            dispatch(sendEtherState('waiting-for-tx-to-mine'))
            dispatch(setTxHash(result))
          } else {
            console.log("something went wrong we've assigned the dispute")
            console.log(error)
            dispatch(sendEtherState('init'))
          }
        })
      }
    } catch (error) {
      if(error.message==='Wallet Address Undefined'){
        notify.show("Please unlock your MetaMask Account")
      } else {
        console.log(error)
        raven.captureException(error)
      }
    }
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
