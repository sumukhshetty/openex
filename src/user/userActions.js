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

module.exports = {
  startListeningUserAuth: () => (dispatch, getState) =>{
    firebaseRef.auth().onAuthStateChanged(function(user){
      if(user){
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
