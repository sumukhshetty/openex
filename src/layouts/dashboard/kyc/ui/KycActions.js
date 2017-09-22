import { firebaseRef } from '../../../../index'
const request = require('request')

module.exports = {
  verifyPhoneNumber: (
    phoneNumber,
    country,
    uid
  ) => dispatch => {
    var url = process.env.FIREBASE_FUNCTIONS_URL +'requestPhoneVerification'
    var options = {
      method: 'post',
      body: {
        phoneNumber: phoneNumber,
        country: country,
        uid: uid
      },
      headers: { 'Content-Type': 'application/json' },
      json: true,
      url: url
    }
    request(options, function(err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var statusCode = res.statusCode
      if (statusCode === 200) {
        console.log('Succesfully sent text with otp to ' + phoneNumber);
      }
      if (statusCode === 500) {
        throw res.body.error
      }
      if (statusCode === 401) {
        throw res.body.error
      }
    })
  },
  verifyOTP: (
    phoneNumber,
    country,
    token,
    uid
  ) => dispatch => {
    var url = process.env.FIREBASE_FUNCTIONS_URL +'verifyPhoneToken'
    var options = {
      method: 'post',
      body: {
        phoneNumber: phoneNumber,
        country: country,
        token: token,
        uid: uid
      },
      headers: { 'Content-Type': 'application/json' },
      json: true,
      url: url
    }
    request(options, function(err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var statusCode = res.statusCode
      if (statusCode === 200) {
        console.log('Succesfully sent text with otp to ' + phoneNumber);
      }
      if (statusCode === 500) {
        throw res.body.error
      }
      if (statusCode === 401) {
        throw res.body.error
      }
    })
  }
}
