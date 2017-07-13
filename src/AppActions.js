var request = require('request')
import getWeb3 from './util/getWeb3'
import { firebaseRef } from './index'

export const SET_WEB_3 = 'SET_WEB_3'
function web3Init(web3) {
  return {
  type:SET_WEB_3,
  payload:web3
  }
}

function wrongNetwork(wrongNetworkBool){
  return {
    type: 'GET_WRONG_NETWORK_STATUS',
    payload: wrongNetworkBool
  }
}

function setCountry(countryCode) {
  console.log("AppActions.setCountry")
  return {
    type: 'SET_COUNTRY_CODE',
    payload: countryCode
  }
}

function getBuyTradeAdvertisements(buyTradeAdvertisements){
  return {
    type: 'GET_BUY_TRADE_ADVERTISEMENTS',
    payload: buyTradeAdvertisements
  }
}

function getSellTradeAdvertisements(sellTradeAdvertisements){
  return {
    type: 'GET_SELL_TRADE_ADVERTISEMENTS',
    payload: sellTradeAdvertisements
  }
}

module.exports = {
  setWeb3: (web3) => (dispatch) => {
    console.log('AppActions.setWeb3')
    dispatch(web3Init(web3))
    // TODO change this to mainnet
    try {
      web3.version.getNetwork(function(error, result){
        if(!error){
          console.log(result)
          if(result==='42'){
            dispatch(wrongNetwork(false))
          } else {
            dispatch(wrongNetwork(true))
          }
        } else{
          console.log("AppActions.setWeb3")
          console.log(error)
        }
      })
    } catch (error) {
      console.log("AppActions.setWeb3")
      console.log(error)
      dispatch(wrongNetwork(false))
    }
  },
  getCountry: () => (dispatch) => {
    var url = 'https://freegeoip.net/json/'
    var options = {
      method: 'get',
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
        //browserHistory.push('/admin')
        console.log("freegeoip.200124")
        console.log(res)
        dispatch(setCountry(res.body.countryCode))
        firebaseRef.database().ref('buytradeadvertisements/'+res.body.countryCode).once('value', function(snap){
          console.log("got the buytradeadvertisements")
          console.log(snap.val())
          dispatch(getBuyTradeAdvertisements(snap.val()))
        })
        firebaseRef.database().ref('selltradeadvertisements/'+res.body.countryCode).once('value', function(snap){
          console.log('got the selltradeadvertisements')
          console.log(snap.val())
          dispatch(getSellTradeAdvertisements(snap.val()))
        })
      }
      if (statusCode === 500){
        throw res.body.error
      }
      if (statusCode === 401){
        throw res.body.error
      }
    })
  }
}