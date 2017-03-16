import {firebaseRef} from './../../../index.js'
//import { browserHistory } from 'react-router'


export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}


export function loginUser(loginInfo, web3) {
  return function(dispatch) {
    // Using truffle-contract we create the authentication object.
    // Get current ethereum wallet.
    const auth = firebaseRef.auth()
    var email = loginInfo.email;
    const pass = loginInfo.password;
    var errormessage = '';
    auth.signInWithEmailAndPassword(email, pass).then(function(firebaseUser) {
      dispatch(userLoggedIn(firebaseUser))
    }).catch(function(error) {
      errormessage = error.message;
      console.log(errormessage)
      //TODO handleAuthError
    });

  }
}
