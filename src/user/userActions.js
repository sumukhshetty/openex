import {firebaseRef} from './../index.js'
import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'

function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  }
}

function getUserProfile(userProfile) {
  return {
    type: 'GET_USER_PROFILE',
    payload: userProfile
  }
}

function users(usersPayload){
  return {
    type: 'GET_USERS',
    payload: usersPayload
  }
}

function getBuyTradeAdvertisements(buyTradeAdvertisements){
  return {
    type: 'GET_BUY_TRADE_ADVERTISEMENTS',
    payload: buyTradeAdvertisements
  }
}

function getSellTradeAdvertisements(sellTradeAdvertisements){
  return {
    type: 'GET_SELL_TRADE_ADVERTISEMENTS',
    payload: sellTradeAdvertisements
  }
}

function getActiveTrades (activeTradesPayload) {
  return {
    type: 'GET_ACTIVE_TRADES',
    payload: activeTradesPayload
  };
}

function getCompletedTrades (completedTradesPayload) {
  return {
    type: 'GET_COMPLETED_TRADES',
    payload: completedTradesPayload
  }
}

function getDisputedTrades (disputedTradesPayload) {
  return {
    type: 'GET_DISPUTED_TRADES',
    payload: disputedTradesPayload
  }
}


function getPurchaseRequests (purchaseRequestsPayload) {
  return {
    type: 'GET_PURCHASE_REQUESTS',
    payload: purchaseRequestsPayload
  };
}

function getTradeAdvertisements (tradeAdvertisementsPayload) {
  return {
    type: 'GET_TRADE_ADVERTISEMENTS',
    payload: tradeAdvertisementsPayload
  };
}

function updateReduxStoreDataState (value) {
  return {
    type: 'GET_REDUX_STORE',
    payload: value
  }
}

function etherPrice(pricesPayload) {
  return {
    type: 'GET_ETHER_PRICE',
    payload: pricesPayload
  }
}

module.exports = {
  checkLocalStorage: ()=>(dispatch,getState)=>{
    if (!firebaseRef.auth().currentUser) {
      let hasLocalStorageUser = false;
      for (let key in localStorage) {
          if (key.startsWith("firebase:authUser:")) {
              hasLocalStorageUser = true;
              dispatch(updateReduxStoreDataState(true))
          }
      }
      if (!hasLocalStorageUser) {
          dispatch(updateReduxStoreDataState(false))
      }
    }
  },
  startListeningUserAuth: () => (dispatch, getState) =>{
    firebaseRef.auth().onAuthStateChanged(function(user){
      if(user){
        dispatch(updateReduxStoreDataState(true))
        firebaseRef.database().ref('/users/'+user.uid).on('value',function(snap){
          var userProfile = snap.val()
          dispatch(getUserProfile(userProfile))
          dispatch(getActiveTrades(userProfile['activetrades']))
          dispatch(getDisputedTrades(userProfile['disputedtrades']))
          dispatch(getTradeAdvertisements(userProfile['advertisements']))
          dispatch(getCompletedTrades(userProfile['completedtrades']))
          dispatch(userLoggedIn(user))
          firebaseRef.database().ref('/users').on('value', function(snap){
            dispatch(users(snap.val()))
          })
          firebaseRef.database().ref('/buytradeadvertisements/' + userProfile.country).on('value',function(snap){

            dispatch(getBuyTradeAdvertisements(snap.val()))
          })
          firebaseRef.database().ref('/selltradeadvertisements/'+userProfile.country).on('value', function(snap){

            dispatch(getSellTradeAdvertisements(snap.val()))
          })
          firebaseRef.database().ref('/purchaserequests/'+ userProfile.country).on('value', function(snap){

            dispatch(getPurchaseRequests(snap.val()))
          })
          firebaseRef.database().ref('/prices/ETH/' + userProfile.currency).on('value', function(snap) {
            console.log('got price for ETH in ' + userProfile.currency + ' : ' + snap.val());
            dispatch(etherPrice(snap.val()));
          })
          dispatch(updateReduxStoreDataState(false))
          return browserHistory.push('/dashboard')
        })
      } else {
        dispatch({ type: "USER_LOGGED_OUT"});
        return browserHistory.push('/')
      }
    })
  }
}
