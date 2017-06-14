import { firebaseRef } from './../index'
import * as cryptoHelpers from './../util/cryptoHelpers'
const request = require('request')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

function userLoggedInError(error){
  return {
    type: "USER_LOGGED_IN_ERROR",
    payload: error
  }
}


module.exports = {
  login: (web3) => (dispatch) => {
    console.log('HomeNavActions.login')
    // try to login without checking if the user exists
    var data = cryptoHelpers.toHex('I am logging into the automte ether marketplace and I have read the terms and conditions');
    web3.currentProvider.sendAsync({ id: 1, method: 'personal_sign', params: [web3.eth.accounts[0], data] },
      function(err, result) {
        let signature = result.result;
        console.log(signature)
        //dispatch(exchange.authenticate(sig, user))
        var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/loginUserCustomAuth'
        var options = {
          method: 'post',
          body: {
            "account_address":web3.eth.coinbase,
            "signature": signature,
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
            console.log("loginUserCustomAuth.200")
            // do more stuff
            firebaseRef.auth().signInWithCustomToken(res.body.token)
              .then(function(firebaseUser){
                console.log(firebaseUser)
                /*userid = firebaseUser.uid
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
                firebaseRef.database().ref('/notificationsConfig/'+userid+'/email').set(email)*/
                dispatch(userLoggedIn(firebaseUser))
              })
              .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode,errorMessage)
              dispatch(userLoggedInError(error))
              // ...
            });

          }
          if (statusCode === 500){
            dispatch(userLoggedInError(res.body.error))
            throw res.body.error
          }
          if (statusCode === 401){
            dispatch(userLoggedInError(res.body.error))
            throw res.body.error
          }
        })
    })

  }
}