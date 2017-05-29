import {firebaseRef} from './../../../index.js'

const currencies = require('country-currency')

export const USER_SIGNED_UP = 'USER_SIGNED_UP'
function userSignedUp (user, currency) {
  return {
    type: USER_SIGNED_UP,
    payload: user,
    currency: currency
  }
}

function userSignedUpError (error) {
  return {
    type: 'USER_SIGNED_UP_ERROR',
    payload: error
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
    var currency
    try {
      currency = currencies.byCountry().get(country)
    } catch(e){
      currency = 'USD'
    }

    auth.createUserWithEmailAndPassword(email, pass).then(function (firebaseUser) {
      userid = firebaseUser.uid
      var userdata = {
        //'email': email, better that we stop storing this in publically viewable data
        'country': country,
        'currency': currency,
        'username': username,
        'isAdmin': false,
        'trustworthiness': 'unknown',
        'verifiedIdentification': false,
        'verifiedPhoneNumber': false,
        'verifiedEmail': true,
        'numberOfTrades': 0,
        'accountCreated': new Date().toUTCString(),
        'tradeVolume': 0,
        'avgFeedback': 0,
        'firstPurchase': '-',
        'shownotificationrequest': 'true',
      }
      firebaseRef.database().ref('/users/' + userid).set(userdata)
      firebaseUser.updateProfile({
        displayName: username
      })
      firebaseUser.sendEmailVerification().then(function () {
        // Email sent
      }, function (error) {
        dispatch(userSignedUpError(error))
      })
      dispatch(userSignedUp(firebaseUser, currency))
    }).catch(function (error) {
      console.log(error)
      dispatch(userSignedUpError(error))
    })
  }
}
