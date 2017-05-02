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



  requestEther: (amount, price, order, buyerUid, buyerUsername, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    var now = new Date();
    amount = Number(amount);
    var newRequest = firebaseRef.database().ref('/purchaserequests').push({
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
      contractAddress: order.contractAddress
    }, function(err) {
      firebaseRef.database().ref('/sellorders/' + order.orderId + '/requests/' + newRequest.key)
      .set({
        buyerUid: buyerUid
      });
      firebaseRef.database().ref('/sellorders/' + order.orderId + '/pendingBalance')
      .set(amount);
      firebaseRef.database().ref('/sellorders/' + order.orderId + '/availableBalance')
      .set(order.availableBalance - amount);
      firebaseRef.database().ref('/users/' + order.sellerUid+ '/activeTrades/' + newRequest.key)
      .set({
        tradeType: 'sell-ether'
      });
      firebaseRef.database().ref('/users/' + buyerUid + '/activeTrades/' + newRequest.key)
      .set({
        tradeType: 'sell-ether'
      })
      .then(function() {
        browserHistory.push('dashboard/');
      });
    });
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
