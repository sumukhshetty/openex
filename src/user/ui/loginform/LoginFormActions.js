import {firebaseRef} from './../../../index.js'
//import { browserHistory } from 'react-router'


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
      dispatch(userLoggedIn(firebaseUser))
    }).catch(function(error) {
      errormessage = error.message;
      console.log(errormessage)
      dispatch(userLoggedInError(error))
    });

  }
}
