import { firebaseRef } from './../index'
import * as cryptoHelpers from './../util/cryptoHelpers'
import {notify} from 'react-notify-toast';
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
    console.log(web3)
    if(web3.wrongnetwork){
      notify.show("It looks like you're on the wrong network, please switch over to Kovan")
    } else {
      var data = cryptoHelpers.toHex('I am logging into the automte ether marketplace and I have read the terms and conditions');
      try {
        web3.data.currentProvider.sendAsync({id: 1, method: 'personal_sign', params: [web3.data.eth.accounts[0], data] },
          function(err, result) {
            if(result.error){
              if(result.error.message.includes("TypeError: Cannot use 'in' operator to search for 'from' in null")) {
                notify.show("It looks like your MetaMask account is locked")
              }
              throw result.error
            }
            let signature = result.result;
            //dispatch(exchange.authenticate(sig, user))
            var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/loginUserCustomAuth'
            var options = {
              method: 'post',
              body: {
                "account_address":web3.data.eth.coinbase,
                "signature": signature,
              },
              headers: { "Content-Type": "application/json" },
              json: true,
              url: url
            }
            //dispatch(logginin) // with this dispatch we show a spinner with a logging in
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
                //this should toast the message
                notify.show(res.body.error)
                console.log(res.body.error)
                dispatch(userLoggedInError(res.body.error))
                throw res.body.error
              }
            })
        })      
      } catch (error) {
        console.log(error)
        throw error
      }
    }

  }
}