import OrderFactoryContract from '../../../build/contracts/OrderFactory.json';
// import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
// import { browserHistory } from 'react-router'
import factoryAddress from '../../contract_addresses/orderfactory.js';

const contract = require('truffle-contract');

export const GET_ORDERS = 'GET_ORDERS';
function getOrdersList (ordersListPayload) {
  return {
    type: GET_ORDERS,
    payload: ordersListPayload
  };
}

export function ordersList (web3) {
  return function (dispatch) {
    const factory = contract(OrderFactoryContract);
    var factoryInstance;

    var _ordersList = [];
    factory.setProvider(web3.currentProvider);

    factory.at(factoryAddress.factoryAddress)
      .then(function (_factory) {
        factoryInstance = _factory;
        var orderCreatedEvent = factoryInstance.OrderCreated({}, {fromBlock: 0, toBlock: 'latest'});
        orderCreatedEvent.watch(function (error, result) {
          if (error) {
            console.log(error);
          }

          if (result.args.seller === web3.eth.coinbase) {
            _ordersList.push([result.args.orderAddress, result.args.orderType]);
            console.log(_ordersList);
            dispatch(getOrdersList(_ordersList));
          }
        });
      });
  };
};
