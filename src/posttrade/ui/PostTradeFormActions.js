import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const request = require('request')
const contract = require('truffle-contract')

import {firebaseRef} from './../../index.js'

export const POST_TRADE = 'POST_TRADE'
function tradeCreated(tradePayload) {
  return {
    type: POST_TRADE,
    payload: tradePayload
  }
}

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

export function postTrade(postTradeDetails, web3, state) {
  return function(dispatch) {
    dispatch(sendEtherState('sending'));
    // Using truffle-contract we create the authentication object.
    // TODO check what kind of trade is being made and either get the contract
    // or make an entry in the firebase db
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
      // TODO @arseniy maybe we should move this to firebase cloud function to improve site performance
      // var newOrder = firebaseRef.database().ref("sellorders/").push(postTradeDetails);
      // firebaseRef.database().ref("sellorders/"+newOrder.key+'/orderId').set(newOrder.key);
      // firebaseRef.database().ref("users/"+state.user.data.uid+"/advertisements/").child(newOrder.key).set({tradeType: postTradeDetails.tradeType})
      // firebaseRef.database().ref('/sellorders/' + newOrder.key + '/contractTx')
      // .set(txHash['tx']);
      // firebaseRef.database().ref('/sellorders/' + newOrder.key + '/contractAddress')
      // .set(txHash['logs'][0]['args']['orderAddress']);
      // dispatch(tradeCreated(postTradeDetails))
      // console.log("about to push to dashboard")
      // browserHistory.push('/dashboard')
    })
    .catch(function (error) {
      dispatch(sendEtherState('init'));
      console.log(error);
    })
  }
}


export function buyEtherPostTrade(postTradeDetails, web3, state) {
  return function(dispatch){
    dispatch(sendEtherState('sending'));
    try {
      firebaseRef.database().ref("users/"+state.user.data.uid).once("value", function(snap){
        var userData = snap.val()
        var newOrder = firebaseRef.database().ref("buyorders/"+userData.country).push(postTradeDetails);
        console.log(state.user.data.uid)
        firebaseRef.database().ref("buyorders/"+userData.country+"/"+newOrder.key+'/orderId').set(newOrder.key);
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
