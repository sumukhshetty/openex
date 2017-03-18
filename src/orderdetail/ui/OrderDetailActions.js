import OrderFactoryContract from '../../../build/contracts/OrderFactory.json'
import ContractDirectoryContract from '../../../build/contracts/ContractDirectory.json'
import SellOrderContract from '../../../build/contracts/SellOrder.json'
import BuyOrderContract from '../../../build/contracts/BuyOrder.json'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const GET_ORDER = 'GET_ORDER'
function getOrderDetail(orderDetailPayload) {
  return {
    type: GET_ORDER,
    payload: orderDetailPayload
  }
}

export function orderDetail(web3, address) {
  console.log("in orderDetail(web3)")
  console.log("address: " + address);
  return function(dispatch) {
    console.log("web3.eth.coinbase: " + web3.eth.coinbase);
    const factory = contract(OrderFactoryContract);
    var factoryInstance;
    var orderContract;
    var orderInstance;

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
      var orderCreatedEvent = factoryInstance.OrderCreated({orderAddress: address},{});
      orderCreatedEvent.watch(function(error, result) {
        if(error) {
          console.log(result);
        }
        console.log(result.args.orderAddress);
        if(result.args.orderType === "sell") {
          orderContract = contract(SellOrderContract);
        } else {
          orderContract = contract(BuyOrderContract);
        }
        orderContract.setProvider(web3.currentProvider);
        orderContract.at(result.args.orderAddress)
        .then(function(_order) {
          orderInstance = _order;
          if(result.args.orderType === "sell") {
            return orderInstance.availableFunds();
          }
          else {
            return orderInstance.amount();
          }
        })
        .then(function(amt) {
          dispatch(getOrderDetail([result.args.orderType, web3.fromWei(amt, 'ether').toString()]));
        });
      })
    })
  }
}
