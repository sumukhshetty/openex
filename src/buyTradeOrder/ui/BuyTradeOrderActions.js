import SellOrderContract from '../../../build/contracts/SellOrder.json'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'

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



  requestEtherFromSeller: (amount, uid, sellerUid, buyerUsername, sellerUsername, orderId, contractAddress, availableBalance, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    var now = new Date();
    var newRequest = firebaseRef.database().ref('/purchaserequests').push({
      amount: amount,
      buyerAddress: coinbase,
      buyerUid: uid,
      buyerUsername: buyerUsername,
      sellerUid: sellerUid,
      sellerUsername: sellerUsername,
      createdAt: now,
      lastUpated: now,
      status: 'Awaiting Seller Confirmation',
      contractAddress: contractAddress
    }, function(err) {
      firebaseRef.database().ref('/sellorders/' + orderId + '/requests/' + newRequest.key)
      .set({
        buyerUid: uid
      });
      firebaseRef.database().ref('/sellorders/' + orderId + '/pendingBalance')
      .set(amount);
      firebaseRef.database().ref('/sellorders/' + orderId + '/availableBalance')
      .set(availableBalance - amount);
      firebaseRef.database().ref('/users/' + sellerUid+ '/activeTrades/' + newRequest.key)
      .set({
        tradeType: 'sell-ether'
      });
      firebaseRef.database().ref('/users/' + uid+ '/activeTrades/' + newRequest.key)
      .set({
        tradeType: 'sell-ether'
      })
      .then(function() {
        browserHistory.push('dashboard/');
      });
    });
  }
}
