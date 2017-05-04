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

  createBuyOrderContract: (buyOrder, amount, price, sellerUsername, buyerAddress, orderId, uid, buyerUid, web3) => (dispatch) => {
    console.log("ui.createBuyOrderContract.createBuyOrderContract")
    console.log(buyOrder)
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);
    var factoryInstance;
    var coinbase = web3.eth.coinbase;
    // var block, orderAddress
    firebaseRef.database().ref('/users/'+ buyOrder.buyerUid + '/fcmToken/').once("value", function(snap){
      var fcmToken = snap.val()
      var postData = {
        orderId: orderId,
        sellerUid: uid,
        sellerUsername: sellerUsername,
        buyerFcmToken: fcmToken
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
                    sellerUid: uid,
                    price: price
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
      
    })
  }
}
