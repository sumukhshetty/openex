import {firebaseRef} from './../../../index.js'
//import { browserHistory } from 'react-router'


export const USER_SIGNED_UP = 'USER_SIGNED_UP'
function userSignedUp(user) {
  return {
    type: USER_SIGNED_UP,
    payload: user
  }
}


export function signUpUser(signUpInfo, web3) {
  return function(dispatch) {
    const auth = firebaseRef.auth()
    var userid = "";
    var email = signUpInfo.email;
    var username = signUpInfo.username
    var country = signUpInfo.country
    const pass = signUpInfo.password;
    var errormessage = '';
    auth.createUserWithEmailAndPassword(email, pass).then(function(firebaseUser) {
      userid = firebaseUser.uid;
      var userdata = {"email":email,
        "country": country,
        "username": username
      };
      firebaseRef.database().ref("users/" + userid).set(userdata);
      dispatch(userSignedUp(firebaseUser))

    }).catch(function(error) {
      errormessage = error.message;
      console.log(errormessage)
      //TODO handleAuthError
    });
  }
}
