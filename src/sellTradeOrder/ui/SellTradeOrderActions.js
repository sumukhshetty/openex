import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
const request = require('request')
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
      .on("value", function(snapshot){
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

  resetStatus: (status, orderId) => (dispatch) => {
    console.log('called resetStatus');
    if(status === 'locked') {
      firebaseRef.database.ref('/buyorders/'+ orderId + '/status')
        .set('Initiated');
      firebaseRef.database().ref('/buyorders/' + orderId + '/sellerUid')
        .set('');
    }
  },

  createBuyOrderContract: (amount, buyerAddress, orderId, uid, buyerUid, web3) => (dispatch) => {
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);
    var factoryInstance;
    var coinbase = web3.eth.coinbase;
    // var block, orderAddress

    var postData = {
      orderId: orderId,
      sellerUid: uid
    }

    var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/acceptbuy'
    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }
    request(options, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var headers = res.headers
      var statusCode = res.statusCode
      console.log('headers: ', headers)
      console.log('statusCode: ', statusCode)
      console.log('body: ', body)
      if(statusCode === 500) {
        console.error('Server responded with an error: ' + res.body.error);
        throw res.body.error
      }
      if(statusCode === 200) {
        factory.at(factoryAddress.factoryAddress)
          .then(function (_factory) {
            factoryInstance = _factory;
            console.log(buyerAddress);
            return factoryInstance.createBuyOrder(buyerAddress, web3.toWei(amount, 'ether'), {from: coinbase});
          })
          .then(function (txHash) {
            console.log(txHash);
            request({
                method: 'post',
                body: {
                  orderId: orderId,
                  contractTx: txHash['tx'],
                  contractAddress: txHash['logs'][0]['args']['orderAddress'],
                  sellerUid: uid
                },
                json: true,
                url: 'https://us-central1-automteetherexchange.cloudfunctions.net/buyOrderCreated'
              },
              function(err, res, body) {
                if (err) {
                  console.error('error posting json: ', err)
                  throw err
                }
                if(res.statusCode === 500) {
                  console.error('Server responded with an error: ' + res.body.error);
                  throw res.body.error
                }
                if(res.statusCode === 200) {
                  browserHistory.push('/activebuyorder/' + orderId)
                }
              })
          })
          .catch(function(error) {
            console.log('error creating buy order [SellTradeOrderActions]');
            console.log(error);
          });
      }
    });

    // firebaseRef.database().ref('/buyorders/' + orderId + '/status')
    //   .set('locked');
    // firebaseRef.database().ref('/buyorders/' + orderId + '/sellerUid')
    //   .set(uid);
    //TODO: [AK issue #100] A server call that will reset the status if after X amount of time the state is still locked.
    //        This can probably be done using firebase functions


    // factory.at(factoryAddress.factoryAddress)
    //   .then(function (_factory) {
    //     factoryInstance = _factory;
    //     console.log(buyerAddress);
    //     return factoryInstance.createBuyOrder(buyerAddress, web3.toWei(amount, 'ether'), {from: coinbase});
    //   })
    //   .then(function (txHash) {
    //     console.log(txHash);
    //     firebaseRef.database().ref('/buyorders/' + orderId)
    //     .once('value', function(snapshot) {
    //       if(snapshot.val()['sellerUid'] === uid && snapshot.val()['status'] === 'locked') {
    //         firebaseRef.database().ref('/buyorders/' + orderId + '/contractTx')
    //           .set(txHash['tx']);
    //         firebaseRef.database().ref('/buyorders/' + orderId + '/contractAddress')
    //           .set(txHash['logs'][0]['args']['orderAddress']);
    //         firebaseRef.database().ref('/buyorders/' + orderId + '/status')
    //           .set('Awaiting Escrow');
    //
    //         firebaseRef.database().ref('users/' + buyerUid).child('activeTrades').child(orderId).set({tradeType: 'buy-ether'});
    //         firebaseRef.database().ref('users/' + uid).child('activeTrades').child(orderId).set({tradeType: 'buy-ether'});
    //         firebaseRef.database().ref('users/' + buyerUid).child('advertisements').child(orderId).set(null);
    //
    //         browserHistory.push('/activebuyorder/' + orderId)
    //       }
    //     })
    //   })
    //   .catch(function(error) {
    //     console.log('error creating buy order [SellTradeOrderActions]');
    //     console.log(error);
    //     firebaseRef.database().ref('/buyorders/' + orderId + '/status')
    //       .set('Initiated');
    //       firebaseRef.database().ref('/buyorders/' + orderId + '/sellerUid')
    //         .set('');
    //   });
  }
}
