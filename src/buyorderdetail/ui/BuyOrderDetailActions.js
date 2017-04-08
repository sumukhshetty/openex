import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'

export const GET_BUY_ORDER = 'GET_BUY_ORDER'
function getBuyOrder(buyOrderPayload) {
  return {
    type: GET_BUY_ORDER,
    payload: buyOrderPayload
  }
}

module.exports = {
  clearBuyOrderState: () => (dispatch) => {
    dispatch({ type: 'CLEAR_BUY_ORDER'});
  },
  buyOrder: (orderId) => (dispatch) => {
    // firebaseRef.database().ref('buyorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/buyorders/' + orderId)
      .on("value", function(snapshot){
        console.log('got buyorder by id');
        console.log(snapshot.val());
        dispatch(getBuyOrder(snapshot.val()))
      })
  },

  createBuyOrderContract: (amount, buyerAddress, orderId, uid, buyerUid, web3) => (dispatch) => {
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);
    var factoryInstance;
    var coinbase = web3.eth.coinbase;
    var block, orderAddress;

    factory.at(factoryAddress.factoryAddress)
    .then(function(_factory) {
      factoryInstance = _factory;
      return factoryInstance.createBuyOrder(buyerAddress, amount, {from: coinbase});
    })
    .then(function(txHash) {
      console.log(txHash);
      firebaseRef.database().ref('/buyorders/' + orderId + '/contractTx')
      .set(txHash['tx']);
      firebaseRef.database().ref('/buyorders/' + orderId + '/contractAddress')
      .set(txHash['logs'][0]['args']['orderAddress']);
      //TODO: way to do this in one function?
      firebaseRef.database().ref('/buyorders/' + orderId + '/status')
      .set('Contract Created');
      firebaseRef.database().ref('/buyorders/' + orderId + '/sellerUid')
      .set(uid);

      firebaseRef.database().ref("users/"+buyerUid).child('activeEscrows').child(orderId).set({value: 'true'})
      firebaseRef.database().ref("users/"+uid).child('activeEscrows').child(orderId).set({value: 'true'})
      firebaseRef.database().ref("users/"+buyerUid).child('advertisements').child(orderId).set(null)



      //TODO: update state of buyOrder in firebase
      //TODO: redirect to activetrade screen
    })
  }
}
