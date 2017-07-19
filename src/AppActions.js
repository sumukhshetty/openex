import getWeb3 from './util/getWeb3'
import { firebaseRef } from './index'

var request = require('request')
const currencies = require('country-currency')

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

function setCurrency(currency){
  console.log("AppActions.setCurrency")
  return {
    type: 'SET_CURRENCY',
    payload: currency
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

function users(usersPayload){
  console.log('AppActions.users')
  return {
    type: 'GET_USERS',
    payload: usersPayload
  }
}

function etherPrice(pricesPayload) {
  return {
  type:'GET_ETHER_PRICE',
  payload: pricesPayload
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
        firebaseRef.database().ref('/buytradeadvertisements/'+res.body.country_code).once('value', function(snap){
          dispatch(getBuyTradeAdvertisements(snap.val()))
        })
        firebaseRef.database().ref('/selltradeadvertisements/'+res.body.country_code).once('value', function(snap){
          dispatch(getSellTradeAdvertisements(snap.val()))
        })
        dispatch(setCountry(res.body.country_code))

        var currency
        try {
          currency = currencies.byCountry().get(res.body.country_code)
        } catch(e){
          currency = 'USD'
        }
        dispatch(setCurrency(currency))
        request({
          method: 'GET',
          url: 'https://min-api.cryptocompare.com/data/price',
          qs: { fsym: 'ETH', tsyms: currency }
        },
        function(err, res, body) {
          if (err) {
            console.error('error querying for price: ', err)
            throw err
          }
          if(res.statusCode === 200) {
            let prices = JSON.parse(body);
            // ISSUE-253 dont dispatch this to the store - make a write to firebase
            // and then dipatch from firebase as the single source of truth
            dispatch(etherPrice(prices[currency]))
          }
        })
        //dispatch(etherPrice(prices[toSymbols]))
      }
      if (statusCode === 500){
        throw res.body.error
      }
      if (statusCode === 401){
        throw res.body.error
      }
    })
  },
  getUsers: () => (dispatch) => {
    console.log('AppActions.getUsers')
    firebaseRef.database().ref('/users').on('value', function(snap){
      dispatch(users(snap.val()))
    })
  },
}