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

export const GET_USER_INFO = 'GET_USER_INFO'
function getUserInfo(userPayload) {
  return {
    type: GET_USER_INFO,
    payload: userPayload
  }
}

module.exports = {
  buyOrder: (orderId) => (dispatch) => {
    // firebaseRef.database().ref('buyorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/buyorders/' + orderId)
      .once("value", function(snapshot){
        console.log('got buyorder by id');
        console.log(snapshot.val());
        dispatch(getBuyOrder(snapshot.val()))
        firebaseRef.database().ref('/users/' + snapshot.val()['buyerUid'])
        .once("value", function(snapshot) {
          console.log('got user by id');
          console.log(snapshot.val());
          dispatch(getUserInfo(snapshot.val()))
        })
      })
  },

  availableBalance: (contractAddress, web3) => (dispatch) => {

  },

  createBuyOrderContract: (amount, buyerAddress, orderId, uid, buyerUid, web3) => (dispatch) => {
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);
    var factoryInstance;
    var coinbase = web3.eth.coinbase;
    // var block, orderAddress

    firebaseRef.database().ref('/buyorders/' + orderId + '/status')
      .set('locked');

    factory.at(factoryAddress.factoryAddress)
      .then(function (_factory) {
        factoryInstance = _factory;
        console.log(buyerAddress);
        return factoryInstance.createBuyOrder(buyerAddress, web3.toWei(amount, 'ether'), {from: coinbase});
      })
      .then(function (txHash) {
        console.log(txHash);
        firebaseRef.database().ref('/buyorders/' + orderId + '/contractTx')
          .set(txHash['tx']);
        firebaseRef.database().ref('/buyorders/' + orderId + '/contractAddress')
          .set(txHash['logs'][0]['args']['orderAddress']);
        // TODO: way to do this in one function?
        firebaseRef.database().ref('/buyorders/' + orderId + '/status')
          .set('Awaiting Escrow');
        firebaseRef.database().ref('/buyorders/' + orderId + '/sellerUid')
          .set(uid);

        firebaseRef.database().ref('users/' + buyerUid).child('activeTrades').child(orderId).set({tradeType: 'buy-ether'});
        firebaseRef.database().ref('users/' + uid).child('activeTrades').child(orderId).set({tradeType: 'buy-ether'});
        firebaseRef.database().ref('users/' + buyerUid).child('advertisements').child(orderId).set(null);

        browserHistory.push('/activebuyorder/' + orderId)
      })
      .catch(function(error) {
        console.log('error creating buy order [SellTradeOrderActions]');
        console.log(error);
        firebaseRef.database().ref('/buyorders/' + orderId + '/status')
          .set('Initiated');
      });
  }
}
