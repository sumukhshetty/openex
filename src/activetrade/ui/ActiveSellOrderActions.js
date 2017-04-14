// import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import SellOrderContract from '../../../build/contracts/SellOrder.json';
// import { browserHistory } from 'react-router'
// import factoryAddress from '../../contract_addresses/orderfactory.js'

const contract = require('truffle-contract')
import {firebaseRef} from './../../index.js'
import * as orderHelpers from './../../util/orderHelpers'

export const GET_SELL_ORDER = 'GET_SELL_ORDER';
function getSellOrder (sellOrderPayload) {
  return {
    type: GET_SELL_ORDER,
    payload: sellOrderPayload
  };
}

module.exports = {
  clearSellOrderState: () => (dispatch) => {
    dispatch({ type: 'CLEAR_BUY_ORDER'});
  },

  sellOrder: (orderId) => (dispatch) => {
    // firebaseRef.database().ref('sellorders')
    // .orderByKey().equalTo(orderId)
    firebaseRef.database().ref('/sellorders/' + orderId)
      .on('value', function (snapshot) {
        dispatch(getSellOrder(snapshot.val()));
      });
  },

  confirmTradeAction: (contractAddress, buyerAddress, orderId, requestId, amount, web3) => (dispatch) => {
    var coinbase = web3.eth.coinbase;
    const order = contract(SellOrderContract);
    order.setProvider(web3.currentProvider);
    var orderInstance;
    order.at(contractAddress)
      .then(function (_order) {
        orderInstance = _order;
        return orderInstance.addOrder(buyerAddress, amount, {from: coinbase});
      })
      .then(function() {
        firebaseRef.database().ref('/sellorders/' + orderId +'/requests/'+requestId+'/status')
        .set('Awaiting Payment');
      })
  }

};
