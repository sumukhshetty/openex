import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

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

module.exports = {
  sellOrder: (orderId) => (dispatch) => {
    // firebaseRef.database().ref('buyorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/sellorders/' + orderId)
      .once("value", function(snapshot){
        console.log('got sellorder by id');
        console.log(snapshot.val());
        dispatch(getSellOrder(snapshot.val()))
        firebaseRef.database().ref('/users/' + snapshot.val()['sellerUid'])
        .once("value", function(snapshot) {
          console.log('got user by id');
          console.log(snapshot.val());
          dispatch(getUserInfo(snapshot.val()))
        })
      })
  },

  requestEtherFromSeller: (amount, uid, orderId, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    firebaseRef.database().ref('/users/' + uid+ '/activeEscrows/' + orderId)
    .set({
      tradeType: 'sell-ether'
    });
    firebaseRef.database().ref('/sellorders/' + orderId + '/requests/' + uid)
    .set({
      amount: amount,
      buyerAddress: coinbase,
      status: 'Awaiting Seller Confirmation'
    })
    .then(function() {
      browserHistory.push('activesellorder/'+orderId+'/'+uid);
    });


  }
}
