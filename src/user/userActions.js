import {firebaseRef} from './../index.js'
import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'

function userLoggedIn(user, currency) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
    currency: currency
  }
}

function userProfile(userProfile) {
  return {
    type: 'GET_USER_PROFILE',
    payload: userProfile
  }
}

module.exports = {
  startListeningUserAuth: () => (dispatch, getState) =>{
    firebaseRef.auth().onAuthStateChanged(function(user){
      if(user){
        firebaseRef.database().ref('/users/'+user.uid).on('value',function(snap){
        dispatch(userProfile(snap.val()))
        })
        // ISSUE-231-1 remove currency from the dispatch because its already in the userProfile
        firebaseRef.database().ref('/users/'+user.uid+'/currency')
        .once('value', function(snap) {
          dispatch(userLoggedIn(user, snap.val()))
          return browserHistory.push('/dashboard')
        })
      } else {
        dispatch({ type: "USER_LOGGED_OUT"});
        return browserHistory.push('/')
      }
    })
  }
}
