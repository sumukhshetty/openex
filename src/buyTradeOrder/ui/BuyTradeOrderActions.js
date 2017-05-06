import SellOrderContract from '../../../build/contracts/SellOrder.json'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'
const request = require('request')
export const GET_SELL_ORDER = 'GET_SELL_ORDER'
function getSellOrder(sellOrderPayload) {
  return {
    type: GET_SELL_ORDER,
    payload: sellOrderPayload
  }
}

export const GET_USER_INFO = 'GET_USER_INFO'
function getUserInfo(userPayload) {
  return {
    type: GET_USER_INFO,
    payload: userPayload
  }
}

export const GET_BALANCE = 'GET_BALANCE'
function getBalance(balancePayload) {
  return {
    type: GET_BALANCE,
    payload: balancePayload
  }
}

module.exports = {
  availableBalance: (orderId, contractAddress, availableBalance, pendingBalance, web3) => (dispatch) => {
    const order = contract(SellOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    order.at(contractAddress)
      .then(function (_order) {
        orderInstance = _order;
        return orderInstance.availableBalance();
      })
      .then(function(_availableBalance) {
        var contractBalance = web3.fromWei(_availableBalance, 'ether').toNumber();
        if(contractBalance !== (availableBalance+pendingBalance)) {
          firebaseRef.database().ref('/sellorders/' + orderId + '/availableBalance')
          .set(contractBalance-pendingBalance);
          dispatch(getBalance(contractBalance-pendingBalance))
        } else {
          dispatch(getBalance(availableBalance));
        }
      })
  },

  sellOrder: (orderId, web3) => (dispatch) => {
    // firebaseRef.database().ref('buyorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/sellorders/' + orderId)
      .once("value", function(snapshot){
        console.log('got sellorder by id');
        console.log(snapshot.val());
        dispatch(getSellOrder(snapshot.val()))
        // this.availableBalance(orderId, snapshot.val()['contractAddress'], snapshot.val()['availableBalance'], snapshot.val()['pendingBalance'], web3);
        let availableBalance = snapshot.val()['availableBalance'];
        let pendingBalance = snapshot.val()['pendingBalance'];
        const order = contract(SellOrderContract);
        order.setProvider(web3.currentProvider);
        var orderInstance;
        order.at(snapshot.val()['contractAddress'])
          .then(function (_order) {
            orderInstance = _order;
            return orderInstance.availableFunds();
          })
          .then(function(_availableBalance) {
            var contractBalance = web3.fromWei(_availableBalance, 'ether').toNumber();
            if(contractBalance !== (availableBalance+pendingBalance)) {
              firebaseRef.database().ref('/sellorders/' + orderId + '/availableBalance')
              .set(contractBalance-pendingBalance);
              dispatch(getBalance(contractBalance-pendingBalance))
            } else {
              dispatch(getBalance(availableBalance));
            }
          })
        firebaseRef.database().ref('/users/' + snapshot.val()['sellerUid'])
        .once("value", function(snapshot) {
          console.log('got user by id');
          console.log(snapshot.val());
          dispatch(getUserInfo(snapshot.val()))
        })
      })
  },



  requestEther: (amount, price, order, buyerUid, buyerUsername, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    var now = new Date();
    amount = Number(amount);
    var sellerFcmToken;
    console.log("requestEther")
    console.log(order)
    // DEVELOPER NOTE:
    // The fcmToken is set in Dashboard.componentWillMount and will either be a string or
    // a null value. In the fc function if the sellFcmToken is not null we'll send
    // a firebase cloud notification that a user has requested ether and send an email
    // using mailgun
    firebaseRef.database().ref('/users/'+order.sellerUid+'/fcmToken/').once('value',function(snap){
      var sellerfcmToken = snap.val()
      var _body = buyerUsername + " wants to buy some ether!"
      var notificationData = {
        "title": "New Ether Purchase Request",
        "body": _body,
        "email": true,
        "fcm": true,
        "recipientToken": sellerfcmToken,
        "senderUsername": buyerUsername,
        "orderId": order.orderId,
        "seen": false,
        "createdAt": Date.now()
      }

      try{
        var newNotifcation = firebaseRef.database().ref("/notifications/").push(notificationData)
        firebaseRef.database().ref('/users/'+buyerUid+'/notifications/'+newNotifcation.key).set({vaule:true})

      } catch(e){
        console.log("[createBuyOrderContract]",e)
      }

      var postData = {
        amount: amount,
        price: price,
        buyerAddress: coinbase,
        buyerUid: buyerUid,
        buyerUsername: buyerUsername,
        sellerUid: order.sellerUid,
        sellerUsername: order.sellerUsername,
        paymentMethod: order.paymentMethod,
        bankInformation: order.bankInformation,
        createdAt: now,
        lastUpated: now,
        status: 'Awaiting Seller Confirmation',
        contractAddress: order.contractAddress,
        orderId: order.orderId,
        availableBalance: order.availableBalance
      }
      var url = 'https://us-central1-automteetherexchange.cloudfunctions.net/requestEther'
      request({
        method:'post',
        body:{
          postData: postData,
        },
        json:true,
        url: url
      },
      function(err, res, body){
        if (err) {
          console.error('error posting json: ', err)
          throw err
        }
        if(res.statusCode === 200) {
          // DESIGNER NOTE: Is this the best place to send the user to, maybe some kind of confirmation screen
          browserHistory.push('/dashboard')
        }
        if(res.statusCode === 500) {
          console.error('Server responded with an error: ' + res.body.error);
          throw res.body.error
        }
      })
    })
  },

  resetBalance: () => (dispatch) => {
    dispatch({type: 'CLEAR_BALANCE'})
  },

  resetSellOrder: () => (dispatch) => {
    dispatch({type: 'CLEAR_SELL_ORDER'})
  },

  resetUserInfo: () => (dispatch) => {
    dispatch({type: 'CLEAR_USER_INFO'})
  }
}
