import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
//import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const GET_ORDERS = 'GET_ORDERS'
function getOrdersList(ordersListPayload) {
  return {
    type: GET_ORDERS,
    payload: ordersListPayload
  }
}

export function ordersList(web3) {
  return function(dispatch) {
    const factory = contract(OrderFactoryContract);
    var factoryInstance;

    const directory = contract(ContractDirectoryContract);

    var _ordersList = [];
    factory.setProvider(web3.currentProvider);
    directory.setProvider(web3.currentProvider);

    directory.at("0xfbd7975bfe2e0e01b3430f49348d3967eddd78a3")
    .then(function(_directory) {
      return _directory.orderFactoryAddress();
    })
    .then(function(_orderFactoryAddress) {
      return factory.at(_orderFactoryAddress);
    })
    .then(function(_factory) {
      factoryInstance = _factory;
      var orderCreatedEvent = factoryInstance.OrderCreated({seller: web3.eth.coinbase},{fromBlock: 0, toBlock: 'pending'});
        orderCreatedEvent.watch(function(error, result) {
          if(error) {
            console.log(error);
          }
          // TODO change this to a list of dict
          console.log(result)
          _ordersList.push([result.args.orderAddress, result.args.orderType]);
          dispatch(getOrdersList(_ordersList));
        });
    })
  }
}
