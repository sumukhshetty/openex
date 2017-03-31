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

    directory.at('0xacefc4413172035a7f9f22df21f748964f1bd00a')
    .then(function(_directory) {
      return _directory.orderFactoryAddress();
    })
    .then(function(_orderFactoryAddress) {
      return factory.at(_orderFactoryAddress);
    })
    .then(function(_factory) {
      factoryInstance = _factory;
      var orderCreatedEvent = factoryInstance.OrderCreated({},{fromBlock: 0, toBlock: 'latest'});
        orderCreatedEvent.watch(function(error, result) {
          if(error) {
            console.log(error);
          }

          if(result.args.seller === web3.eth.coinbase) {
            _ordersList.push([result.args.orderAddress, result.args.orderType]);
            console.log(_ordersList);
            dispatch(getOrdersList(_ordersList));
          }
        });
    })
  }
}
