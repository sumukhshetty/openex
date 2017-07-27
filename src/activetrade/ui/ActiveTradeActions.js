import {firebaseRef, raven} from './../../index.js'
import * as purchaseRequestHelpers from './../../util/purchaseRequestHelpers'
import * as notificationHelpers from './../../util/notificationHelpers'
import {notify} from 'react-notify-toast'
import * as contractAbis from './../../contract_addresses/contractAbi'
import * as contractAddresses from './../../contract_addresses/contractAddresses'

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

function userSellerInterface(sellerInterface) {
  return {
  type: 'SET_SELLER_INTERFACE',
  payload: sellerInterface
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
  return {
    type: 'UPDATE_CONFIRM_BUTTON_IS_DISABLED',
    payload: value
  }
}

function updateConfirmationButtonColor(value) {
  return {
    type: 'UPDATE_CONFIRM_BUTTON_COLOR',
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
  sellerConfirmsTrade: (seller, buyer, purchaseRequest, purchaseRequestId, web3, sellerInterface, orderDBI, orderBook) => (dispatch) => {
    dispatch(updateConfirmButtonIsDisabled(true))
    try {
      let etherAmount = web3.toWei(Number(purchaseRequest.etherAmount), 'ether');
      //let fiatAmount = web3.toWei(purchaseRequest.fiatAmount)
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
      orderDBI.data.availableBalances(sellerInterface.data.address, function(error, result){
        if(!error){
          console.log("got the availableBalance")
          console.log(result.toNumber())

          // check if the request is greater than the available balance
          //TODO: get feePercentage elsewhere to avoid hardcodinng it, probably from firebase
          if(result.gte(web3.toWei(Number(purchaseRequest.etherAmount*1.01), 'ether'))){
            console.log("the availableBalance is greater than the purchase request")
            dispatch(sendEtherState('sending'));
            //TODO: move to firebase functions
            var event = orderBook.data.OrderAdded({uid:purchaseRequestId})
            console.log(purchaseRequestId, sellerInterface.data.address, purchaseRequest.buyerAddress)
            // TODO change seller to  sellerInterface
            event.watch(function(error, result) {
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
                  contractAddress: sellerInterface.data.address
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
            sellerInterface.data.addOrder(purchaseRequestId, purchaseRequest.buyerAddress,
              etherAmount, price, purchaseRequest.currency, {from:coinbase},
              function(error, result){
                if(!error){
                  console.log("sellerInterface.data.addOrder")
                  dispatch(sendEtherState('waiting-for-tx-to-mine'))
                  dispatch(setTxHash(result))
                  }else {
                    console.log(sellerInterface.data.addOrder)
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
          console.log("sellerInterface.data.availableBalance.error")
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
  sellerReleasesEther: (seller, buyer, purchaseRequest, purchaseRequestId, web3, sellerInterface, orderBook) => (dispatch) => {
    try{
      if(web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
        console.log(coinbase)
      } else {
        throw new Error("Wallet Address Undefined")
      }
      dispatch(sendEtherState('sending'));
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
      //event OrderCompleted(string uid, address seller, address buyer, uint amount);
      var event = orderBook.data.OrderCompleted({uid:purchaseRequestId})
      event.watch(function(error,result) {
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
      sellerInterface.data.completeOrder(purchaseRequestId, {from: coinbase}, function(error, result) {
        if(!error){
          console.log('sellerInterface.data.completeOrder')
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
      // DEVELOPER NOTE: optimize spot - we don't have to check this each time only if we know that the purchase
      // request was in dispute
      if (!purchaseRequest.postProcessingCompleted){
        var ref = firebaseRef.database().ref('/disputes/'+purchaseRequestId).once('value', function(snap){
          console.log(snap.val())
          if(snap.val()){
            firebaseRef.database().ref('/disputes/'+purchaseRequestId).remove()
          }
        })
        purchaseRequestHelpers.updateUserTradingStats(purchaseRequest, purchaseRequest.buyerUid, users)
        purchaseRequestHelpers.updateUserTradingStats(purchaseRequest, purchaseRequest.sellerUid, users)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
        purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
        firebaseRef.database().ref('/purchaserequests/' + user.profile.country + '/' + purchaseRequestId + '/postProcessingCompleted').set(true)
      }
  },
  sellerCancelsTrade: (seller, buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
    var now = new Date()
    var updatedPurchaseRequest = Object.assign({},
            purchaseRequest, {
              sellercancelstime: now.toUTCString(),
              status: 'Seller Canceled Trade',
              lastUpdated: now.toUTCString()
            })
    firebaseRef.database().ref('/purchaserequests/'+seller.country+'/'+purchaseRequestId)
          .set(updatedPurchaseRequest)
          .then(function() {
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.buyerUid, purchaseRequestId)
            purchaseRequestHelpers.removePurchaseRequestFromActiveTrades(purchaseRequest.sellerUid, purchaseRequestId)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.buyerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
            purchaseRequestHelpers.addPurchaseRequestToCompletedTrades(purchaseRequest.sellerUid, purchaseRequestId, purchaseRequest.tradeAdvertisementType)

          });
    notificationHelpers.sendSellerCancelsTrade(seller, buyer, purchaseRequest, purchaseRequestId)
  },
  buyerCancelsTrade: (seller, buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
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
    notificationHelpers.sendBuyerCancelsTrade(seller, buyer, purchaseRequest, purchaseRequestId)
  },
  sellerRaisesDispute: (seller, buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
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
            purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(seller, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
          });
    notificationHelpers.sendSellerRaisesDispute(seller, buyer, purchaseRequest, purchaseRequestId)
  },
  buyerRaisesDispute: (seller, buyer, purchaseRequest, purchaseRequestId) => (dispatch) => {
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
        purchaseRequestHelpers.addPurchaseRequestToDisputedTrades(buyer, purchaseRequestId, purchaseRequest.tradeAdvertisementType)
      });
    notificationHelpers.sendBuyerRaisesDispute(seller, buyer, purchaseRequest, purchaseRequestId)
  },
  arbiterReleasesToSeller: (seller, buyer, arbiter, purchaseRequest, purchaseRequestId, web3) => (dispatch) => {
    try {
      if (web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Wallet Address Undefined")
      }
      if (!ethUtil.isValidAddress(contractAddresses.kovanDisputeResolver)) {
        throw new Error("Invalid address")
      } else {
        const DisputeResolver = web3.eth.contract(contractAbis.DisputeResolver)
        const _instance = DisputeResolver.at(contractAddresses.kovanDisputeResolver)
        var event = _instance.DisputeResolved()
        console.log(_instance)
        //dispatch(setSellerInterface(_instance))
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
    try {
      if (web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Wallet Address Undefined")
      }
      if (!ethUtil.isValidAddress(contractAddresses.kovanDisputeResolver)){
        throw new Error("Invalid address")
      } else {
        const DisputeResolver = web3.eth.contract(contractAbis.DisputeResolver)
        const _instance = DisputeResolver.at(contractAddresses.kovanDisputeResolver)
        var event = _instance.DisputeResolved()
        event.watch((error, result) => {
          console.log("ActiveTradeActions.arbiterReleasesToSeller")
          console.log(error, result)
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
  sellerAddsEther: (amount, uid, contractAddress, web3, sellerInterface, orderDB) => (dispatch) => {
    console.log("ActiveTradeActions.sellerAddsEther")
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
        console.log('about to create the event')
        var event = orderDB.BalanceUpdated()
        event.watch((error, result)=>{
          dispatch(updateConfirmButtonIsDisabled(false))
          dispatch(updateConfirmationButtonColor('#2196f3'))
        })
        if (contractAddress && ((typeof contractAddress)==="string") && (contractAddress.length === 42)) {
          console.log("about to deposit")
          sellerInterface.deposit({from:coinbase, value: value}, function(err, txHash){
            if(!err) {
              dispatch(sendEtherState('init'));
              dispatch(updateConfirmButtonIsDisabled(true))
              dispatch(updateConfirmationButtonColor('grey'))
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
        }

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
        console.log(error)
        raven.captureException(error)
      }

    }
  },
  sellerCreatesSellerInterface: (web3, sellerInterfaceFactory, user) => (dispatch) => {
    try {
      if (web3.eth.coinbase) {
        var coinbase = web3.eth.coinbase
      } else {
        throw new Error("Undefined Wallet Address")
      }
      var event = sellerInterfaceFactory.data.SellerInterfaceCreated({seller:coinbase})
      event.watch((error, result) => {
        const SellerInterface = web3.eth.contract(contractAbis.SellerInterfaceAbi)
        const _instance = SellerInterface.at(result.args.orderAddress)

        // move this to the component will unmount for persistence
        firebaseRef.database().ref('/sellerInterface/'+user.profile.country+'/'+user.data.uid+'/sellerInterfaceAddress')
        .set(result.args.orderAddress)
        event.stopWatching()
        dispatch(userSellerInterface(_instance))
        dispatch(sendEtherState('init'))
        dispatch(updateConfirmButtonIsDisabled(false))
        dispatch(clearTxHash())
      })
      dispatch(sendEtherState('sending'));
      sellerInterfaceFactory.data.createSellerInterface({from: coinbase}, function(error, result){
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
        const _instance = DisputeResolver.at(contractAddresses.kovanDisputeResolver)
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
        _instance.assignDispute(purchaseRequestId, purchaseRequest.contractAddress, seller.country, coinbase, {from:coinbase}, function(error, result){
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
