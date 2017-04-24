import {firebaseRef} from './../../../index.js'
// import { browserHistory } from 'react-router'

export const USER_SIGNED_UP = 'USER_SIGNED_UP'
function userSignedUp (user) {
  return {
    type: USER_SIGNED_UP,
    payload: user
  }
}

export function signUpUser (signUpInfo, web3) {
  return function (dispatch) {
    const auth = firebaseRef.auth()
    var userid = ''
    var email = signUpInfo.email
    var username = signUpInfo.username
    var country = signUpInfo.country
    const pass = signUpInfo.password
    var errormessage = ''
    auth.createUserWithEmailAndPassword(email, pass).then(function (firebaseUser) {
      userid = firebaseUser.uid
      var userdata = {'email': email,
        'country': country,
        'username': username,
        'isAdmin': false,
        'trustworthiness': 'unknown',
        'lastTransfer': 'unknown',
        'verifiedIdentification': false,
        'verifiedPhoneNumber': false,
        'verifiedEmail': false,
        'numberOfTrades': 0
      }
      firebaseRef.database().ref('users/' + userid).set(userdata)
      firebaseUser.updateProfile({
        displayName: username
      })
      dispatch(userSignedUp(firebaseUser))
    }).catch(function (error) {
      errormessage = error.message
      console.log(errormessage)
      // TODO handleAuthError
    })
  }
}
