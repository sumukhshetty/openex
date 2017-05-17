import {firebaseRef} from './../../../index.js'
//import { browserHistory } from 'react-router'


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

function userLoggedInError(error){
  return {
    type: "USER_LOGGED_IN_ERROR",
    payload: error
  }
}

export function loginUser(loginInfo, web3) {
  return function(dispatch) {
    const auth = firebaseRef.auth()
    var email = loginInfo.email;
    const pass = loginInfo.password;
    var errormessage = '';
    auth.signInWithEmailAndPassword(email, pass).then(function(firebaseUser) {
      firebaseRef.database().ref('/users/'+firebaseUser.uid).on('value',function(snap){
        dispatch(userProfile(snap.val()))
      })
      firebaseRef.database().ref('/users/'+firebaseUser.uid+'/currency')
      .once('value', function(snap) {
        dispatch(userLoggedIn(firebaseUser, snap.val()))
      })
    }).catch(function(error) {
      errormessage = error.message;
      console.log(errormessage)
      dispatch(userLoggedInError(error))
    });

  }
}
