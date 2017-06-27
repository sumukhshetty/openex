pragma solidity ^0.4.11;

import "./ETHOrderBook.sol";
import "./zeppelin/ownership/Ownable.sol";

contract OrderBookFactory is Ownable {

  uint feePercent;
  address disputeInterface;

  function OrderBookFactory(address _disputeInterface) {
    feePercent = 1;
    disputeInterface = _disputeInterface;
  }

  //Only contracts whose addresses are logged by this event will appear on the exchange.
  event ETHOrderBookCreated(address indexed seller, address orderAddress);

  function createETHOrderBook(string country) external {
    ETHOrderBook orderBook = new ETHOrderBook(msg.sender, disputeInterface, country, feePercent);

    orderBook.transferOwnership(owner);

    ETHOrderBookCreated(msg.sender, orderBook);
  }

}
