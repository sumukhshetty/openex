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
    console.log("SellTradeOrderActions.buyOrder")
    console.log(firebaseRef.auth().currentUser.uid)
    firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid).once("value", function(snap){
      var userData = snap.val()  
      console.log(userData)
      firebaseRef.database().ref('/buyorders/' + userData.country + '/' + orderId)
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
    })
  },

  createBuyOrderContract: (buyOrder, amount, price, sellerUsername, buyerAddress, orderId, uid, buyerUid, web3) => (dispatch) => {
    // TODO code review and refactor
    console.log("createBuyOrderContract")
    const factory = contract(OrderFactoryContract);
    factory.setProvider(web3.currentProvider);
    var factoryInstance;
    var coinbase = web3.eth.coinbase;
    // var block, orderAddress
    firebaseRef.database().ref('/users/'+ buyOrder.buyerUid).once("value", function(snap){
      console.log("createBuyOrderContract")
      var buyerUserData = snap.val()
      console.log(buyerUserData)
      var _body = sellerUsername + " has confirmed your buy order"
      console.log(buyerUserData.fcmToken)
      var _fcmToken
      if(buyerUserData.fcmToken){
        _fcmToken = buyerUserData.fcmToken
      } else {
        _fcmToken = null
      }
      var notificationData = {
        "title": "New Seller Confirmation",
        "body": _body,
        "type": "accept-buy-order",
        "email": true,
        "fcm": true,
        "recipientToken": _fcmToken,
        "recipientEmail": buyerUserData.email,
        "verifiedEmail": buyerUserData.verifiedEmail,
        "senderUsername": sellerUsername,
        "orderId": orderId,
        "seen": false,
        "createdAt": Date.now()
      }


      var postData = {
        orderId: orderId,
        sellerUid: uid,
        sellerUsername: sellerUsername,
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
          console.log("ok got the 200")
          // TODO change this to a reducer - sometimes the user can wait for a really long time to get this
          factory.at(factoryAddress.factoryAddress)
            .then(function (_factory) {
              factoryInstance = _factory;
              console.log(buyerAddress);
              return factoryInstance.createBuyOrder(buyerAddress, web3.toWei(amount, 'ether'), {from: coinbase});
            })
            .then(function (txHash) {
              console.log("ok got the hash")
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
                    try{
                      var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
                      firebaseRef.database().ref('/users/'+buyerUid+'/notifications/'+newNotifcation.key).set({vaule:true})

                    } catch(e){
                      console.log("[createBuyOrderContract]",e)
                    }
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
