import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
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
    var coinbase = web3.eth.coinbase;
    console.log("web3.eth.coinbase: " + coinbase);
    const factory = contract(OrderFactoryContract);
    var factoryInstance;

    const directory = contract(ContractDirectoryContract);

    var _ordersList = [];
    factory.setProvider(web3.currentProvider);
    directory.setProvider(web3.currentProvider);

    directory.at('0xfbd7975bfe2e0e01b3430f49348d3967eddd78a3')
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
          console.log(result.args.seller);
          console.log(coinbase);
          console.log('typeof seller: ' + (typeof result.args.seller));
          console.log('typeof coinbase: ' + (typeof coinbase));
          if(result.args.seller == coinbase) {
            _ordersList.push([result.args.orderAddress, result.args.orderType]);
            console.log(_ordersList);
            dispatch(getOrdersList(_ordersList));
          }
        });
    })
    // factory.at('0x12580d09d90e6f6edba8d22e8675997440b03047')
    // .then(function(_factory) {
    //   factoryInstance = _factory;
    //   var sellOrderCreatedEvent = factoryInstance.SellOrderCreated({seller: web3.eth.coinbase},{fromBlock: 0, toBlock: 'pending'});
    //     sellOrderCreatedEvent.watch(function(error, result) {
    //       if(error) {
    //         console.log(error);
    //       }
    //       _ordersList.push(result.args.orderAddress);
    //       console.log(_ordersList);
    //       dispatch(getOrdersList(_ordersList));
    //     });
    //
    // })
  }
}
