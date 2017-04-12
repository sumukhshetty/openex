import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'

export const GET_BUY_ORDER = 'GET_BUY_ORDER'
function getSellOrder(sellOrderPayload) {
  return {
    type: GET_BUY_ORDER,
    payload: sellOrderPayload
  }
}

module.exports = {
  clearSellOrderState: () => (dispatch) => {
    dispatch({ type: 'CLEAR_BUY_ORDER'});
  },
  sellOrder: (orderId) => (dispatch) => {
    // firebaseRef.database().ref('sellorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/sellorders/' + orderId)
      .on("value", function(snapshot){
        console.log('got sellorder by id');
        console.log(snapshot.val());
        dispatch(getSellOrder(snapshot.val()))
      })
  }
}
