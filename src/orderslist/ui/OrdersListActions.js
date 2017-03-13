import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import SellOrderContract from '../../../build/contracts/SellOrder.json'
import BuyOrderContract from '../../../build/contracts/BuyOrder.json'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const GET_ORDERS = 'GET_ORDERS'
function getOrdersList(ordersListPayload) {
  return {
    type: GET_ORDERS,
    payload: ordersListPayload
  }
}

export function ordersList(web3) {
  console.log("in ordersList(web3)")
  return function(dispatch) {
    console.log("web3.eth.coinbase: " + web3.eth.coinbase);
    const factory = contract(OrderFactoryContract);
    var factoryInstance;
    var _ordersList = [];
    factory.setProvider(web3.currentProvider);
    factory.at('0x12580d09d90e6f6edba8d22e8675997440b03047')
    .then(function(_factory) {
      factoryInstance = _factory;
      var sellOrderCreatedEvent = factoryInstance.SellOrderCreated({seller: web3.eth.coinbase},{fromBlock: 0, toBlock: 'pending'});
        sellOrderCreatedEvent.watch(function(error, result) {
          if(error) {
            console.log(error);
          }
          _ordersList.push(result.args.orderAddress);
          console.log(_ordersList);
          dispatch(getOrdersList(_ordersList));
        });

    })
  }
}
