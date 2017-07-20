import {firebaseRef} from './../../index.js'


function setDisputedTrades(disputedTradesPayload){
  return {
    type: 'SET_DISPUTED_TRADES',
    payload: disputedTradesPayload
  }
}

function clearDisptedTrades(){
  return {
    type: 'CLEAR_DISPUTED_TRADES',
    payload: null
  }
}

function setProcessKyc(processKycPayload){
  return {
    type: 'SET_PROCESS_KYC',
    payload: processKycPayload
  }
}

function clearProcessKyc(){
  return {
    type: 'CLEAR_PROCESS_KYC',
    payload: null
  }
}

function getPurchaseRequests(purchaseRequests){
  return {
    type: 'GET_PURCHASE_REQUESTS',
    payload: purchaseRequests
  }
}

function clearPurchaseRequests(){
  return {
    type: 'CLEAR_PURCHASE_REQUESTS',
    payload: null
  }
}

module.exports = {
  disputedTrades: () => (dispatch) => {
    firebaseRef.database().ref('/disputes').once('value', function(snap){
      console.log(snap.val())
      dispatch(setDisputedTrades(snap.val()))
    })
    firebaseRef.database().ref('/processkyc').once('value', function(snap){
      dispatch(setProcessKyc(snap.val()))
    })
    firebaseRef.database().ref('/purchaserequests').once('value', function(snap){
      console.log('about to dispatch purchaserequests')
      dispatch(getPurchaseRequests(snap.val()))
    })
  },
  clearState: () => (dispatch) =>{
    dispatch(clearDisptedTrades())
    dispatch(clearProcessKyc())
    dispatch(clearPurchaseRequests())
  }
}
