import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const request = require('request')
const contract = require('truffle-contract')

import {firebaseRef} from './../../index.js'

// New
export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

export const CREATE_BUY_TRADE_ADVERTISEMENT = 'BUY_TRADE_ADVERTISEMENT'
function createBuyTradeAdvertisement(buyTradeAdvertisementPayload){
  return {
    type: CREATE_BUY_TRADE_ADVERTISEMENT,
    payload: buyTradeAdvertisementPayload
  }
}

export function userCreatesBuyTradeAdvertisement(postTradeDetails, web3, user){
  return function(dispatch){
    request({
      method: 'post',
      body: {
        postTradeDetails: postTradeDetails,
        sellerUid: user.data.uid,
        // contractTx: txHash['tx'],
        // TODO change this to sellOrderBook
        //contractAddress: txHash['logs'][0]['args']['orderAddress'] 
      },
      json: true,
      url: 'https://us-central1-automteetherexchange.cloudfunctions.net/createBuyTradeAdvertisement'
    },
    function(err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      if(res.statusCode === 200) {
        dispatch(createBuyTradeAdvertisement(postTradeDetails))
        browserHistory.push('/dashboard')
      }
      if(res.statusCode === 500) {
        console.error('Server responded with an error: ' + res.body.error);
        throw res.body.error
      }
    });
  }
}

export const CREATE_SELL_TRADE_ADVERTISEMENT = 'CREATE_SELL_TRADE_ADVERTISEMENT'
function createSellTradeAdvertisement(sellTradeAdvertisementPayload){
  return {
    type: CREATE_SELL_TRADE_ADVERTISEMENT,
    payload: sellTradeAdvertisementPayload
  }
}

export function userCreatesSellTradeAdvertisement(tradeDetails, web3, user){
  return function(dispatch){
    dispatch(sendEtherState('sending'));
    // ISSUE-231 - new - we change the orderFactoryContract to the orderBookFactoryContract
    request({
      method: 'post',
      body: {
        tradeDetails: tradeDetails,
        sellerUid: user.data.uid,
        //contractTx: txHash['tx'],
        // change this to sellOrderBook
        //contractAddress: txHash['logs'][0]['args']['orderAddress'] 
      },
      json: true,
      url: 'https://us-central1-automteetherexchange.cloudfunctions.net/createSellTradeAdvertisement'
      },
      function(err, res, body) {
        if (err) {
          console.error('error posting json: ', err)
          throw err
        }
        if(res.statusCode === 200) {
          dispatch(createSellTradeAdvertisement(tradeDetails))
          browserHistory.push('/dashboard')
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
      }
    })
    .catch(function (error) {
      dispatch(sendEtherState('init'));
      console.log(error);
    })
  }
}

// this is being deprecated
export const POST_TRADE = 'POST_TRADE'
function tradeCreated(tradePayload) {
  return {
    type: POST_TRADE,
    payload: tradePayload
  }
}

function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

// This creating a sell order and will be replaced with createSellTradeAdvertisement
export function postTrade(postTradeDetails, web3, state) {
  return function(dispatch) {
    dispatch(sendEtherState('sending'));
    // Using truffle-contract we create the authentication object.
    // TODO check what kind of trade is being made and either get the contract
    // or make an entry in the firebase db

    // ISSUE-231-3 this would become the orderBookFactory
    // this should be taken from the redux store in an onBeforeComponentLoads
    // the UI component will then get this from props. This function should be
    // renamed to createSellTradeAdvertisement
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);

    const directory = contract(ContractDirectoryContract);
    directory.setProvider(web3.currentProvider);

    // Declaring this for later so we can chain functions on Authentication.
    var factoryInstance;

    // Get current ethereum wallet. TODO: Wrap in try/catch.
    var coinbase = web3.eth.coinbase;
    //var block, orderAddress;

    factory.at(factoryAddress.factoryAddress)
    .then(function(_factory) {
      console.log('got factory contract');
      factoryInstance = _factory;
      return factoryInstance.createSellOrder({from: coinbase});
    })
    .then(function(txHash) {
      request({
          method: 'post',
          body: {
            postTradeDetails: postTradeDetails,
            sellerUid: state.user.data.uid,
            contractTx: txHash['tx'],
            contractAddress: txHash['logs'][0]['args']['orderAddress']
          },
          json: true,
          url: 'https://us-central1-automteetherexchange.cloudfunctions.net/postSellOrder'
        },
        function(err, res, body) {
          if (err) {
            console.error('error posting json: ', err)
            throw err
          }
          if(res.statusCode === 200) {
            browserHistory.push('/dashboard')
          }
          if(res.statusCode === 500) {
            console.error('Server responded with an error: ' + res.body.error);
            throw res.body.error
          }
        });
    })
    .catch(function (error) {
      dispatch(sendEtherState('init'));
      console.log(error);
    })
  }
}


export function buyEtherPostTrade(postTradeDetails, web3, state) {
  // ISSUE-231-5: creating a buyorder should be moved over to buyTradeAdvertisement, postTradeDetails 
  // should be changed to postBuyTradeAdvertisement, web3 is not used, pass in the user instead of the state
  // userData.country should be be taken from user.profile.country, tradeCreated should be changed to 
  // buyTradeAdvertisementCreated, sendEtherState stays the same
  return function(dispatch){
    dispatch(sendEtherState('sending'));
    try {
      firebaseRef.database().ref("users/"+state.user.data.uid).once("value", function(snap){
        var userData = snap.val()
        var newOrder = firebaseRef.database().ref('/buyorders/' + userData.country).push(postTradeDetails);
        console.log(state.user.data.uid)
        firebaseRef.database().ref('/buyorders/'+userData.country+"/"+newOrder.key+'/orderId').set(newOrder.key);
        firebaseRef.database().ref("users/"+state.user.data.uid).child('advertisements').child(newOrder.key).set({tradeType: postTradeDetails.tradeType})
        
      })
      dispatch(tradeCreated(postTradeDetails))
      browserHistory.push('/dashboard')
    } catch(err) {
      dispatch(sendEtherState('init'));
      console.log(err);
    }
  }
}

export function resetEtherState() {
  return function(dispatch) {
    dispatch(sendEtherState('init'));
  }
}
