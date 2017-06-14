import {firebaseRef, FIREBASE_TIMESTAMP} from './../../../index.js'
const request = require('request')

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
// START deprecate this
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
        'accountCreated': FIREBASE_TIMESTAMP,
        'tradeVolume': 0,
        'avgFeedback': 0,
        'firstPurchase': '-',
        'shownotificationrequest': 'true',
        'kycComplete': false,
      }
      firebaseRef.database().ref('/users/' + userid).set(userdata)
      firebaseUser.updateProfile({
        displayName: username
      })
      firebaseRef.database().ref('/notificationsConfig/'+userid+'/email').set(email)
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
// END deprecate this

function toHex(s) {
   var hex = '';
   for(var i=0;i<s.length;i++) { hex += ''+s.charCodeAt(i).toString(16); }
    var finalhex = '0x' + hex
   return finalhex;
 }

export function signUpUserCustomAuth (signUpInfo, web3) {
  return function (dispatch) {
    var userid = ''
    var email = signUpInfo.email
    var username = signUpInfo.username
    var country = signUpInfo.country
    var currency
    try {
      currency = currencies.byCountry().get(country)
    } catch(e){
      currency = 'USD'
    }
    var data = toHex('I am signing up for the automte ether marketplace and I have read the terms and conditions');
    console.log(data)
    web3.currentProvider.sendAsync({ id: 1, method: 'personal_sign', params: [web3.eth.accounts[0], data] },
      function(err, result) {
        let signature = result.result;
        console.log(signature)
        //dispatch(exchange.authenticate(sig, user))
        var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/signUpUserCustomAuth'
        var options = {
          method: 'post',
          body: {
            "account_address":web3.eth.coinbase,
            "signature": signature,
            "signUpInfo": signUpInfo
          },
          headers: { "Content-Type": "application/json" },
          json: true,
          url: url
        }
        request(options, function (err, res, body) {
          if (err) {
            console.error('error posting json: ', err)
            throw err
          }
          var statusCode = res.statusCode
          if (statusCode === 200){
            console.log("signUpUserCustomAuth.200")
            // do more stuff
            firebaseRef.auth().signInWithCustomToken(res.body.token)
              .then(function(firebaseUser){
                console.log(firebaseUser)
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
                  'accountCreated': FIREBASE_TIMESTAMP,
                  'tradeVolume': 0,
                  'avgFeedback': 0,
                  'firstPurchase': '-',
                  'shownotificationrequest': 'true',
                  'kycComplete': false,
                }
                firebaseRef.database().ref('/users/' + userid).set(userdata)
                firebaseUser.updateProfile({
                  displayName: username
                })
                firebaseRef.database().ref('/notificationsConfig/'+userid+'/email').set(email)
                dispatch(userSignedUp(firebaseUser, currency))
              })
              .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode,errorMessage)
              dispatch(userSignedUpError(error))
              // ...
            });

          }
          if (statusCode === 500){
            throw res.body.error
          }
          if (statusCode === 401){
            throw res.body.error
          }
        })
      })
  }
}