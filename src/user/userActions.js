import {firebaseRef} from './../index.js'
import { browserHistory } from 'react-router'

module.exports = {
  startListeningUserAuth: () => (dispatch, getState) =>{
    firebaseRef.auth().onAuthStateChanged(function(user){
      if(user){
        dispatch({ type: "USER_LOGGED_IN", payload: user });
        return browserHistory.push('/dashboard')
      } else {
        dispatch({ type: "USER_LOGGED_OUT"});
        return browserHistory.push('/')
      }
    })
  }
}

