import {firebaseRef} from './../index.js'
import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'

function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  }
}

function userProfile(userProfile) {
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

module.exports = {
  startListeningUserAuth: () => (dispatch, getState) =>{
    firebaseRef.auth().onAuthStateChanged(function(user){
      if(user){
        firebaseRef.database().ref('/users/'+user.uid).on('value',function(snap){
          var userProfile = snap.val())
          dispatch(userProfile(userProfile))
          dispatch(userLoggedIn(user))
        firebaseRef.database().ref('/buytradeadvertisements/' + userProfile.country).on('value',function(snap){
          dispatch(getBuyTradeAdvertisements(snap.val()))
        })
        firebaseRef.database().ref('/users').once('value', function(snap){
          dispatch(users(snap.val()))
        })
        firebaseRef.database().ref('/selltradeadvertisements/'+userProfile.country).on('value', function(snap){
          dispatch(getSellTradeAdvertisements(snap.val()))
        })
          return browserHistory.push('/dashboard')
        })
        // ISSUE-231-1 remove currency from the dispatch because its already in the userProfile
        /*firebaseRef.database().ref('/users/'+user.uid+'/currency')
        .once('value', function(snap) {
          return browserHistory.push('/dashboard')
        })*/
      } else {
        dispatch({ type: "USER_LOGGED_OUT"});
        return browserHistory.push('/')
      }
    })
  }
}
