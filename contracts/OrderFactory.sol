pragma solidity ^0.4.4;

import "./BuyOrder.sol";
import "./SellOrder.sol";
import "./zeppelin/ownership/Ownable.sol";

/*
  owner of OrderFactory should be the OrderManager
*/
contract OrderFactory is Ownable {

  uint private feePercent;
  uint constant INIT_FEE_PERCENT = 10;

  function OrderFactory() {
    feePercent = INIT_FEE_PERCENT;
  }

  event BuyOrderCreated(address orderAddress);
  event SellOrderCreated(address orderAddress);

  function createBuyOrder(address _buyer, uint amount) external returns (address) {
    BuyOrder order = new BuyOrder(_buyer, msg.sender, amount, calculateFee(amount));

    order.transferOwnership(owner);

    //Only Order contracts whose addresses are passed to this event will appear as listings on the exchange.
    BuyOrderCreated(order);

    return order;
  }

  function createSellOrder() external returns (address) {
    SellOrder order = new SellOrder(msg.sender);

    order.transferOwnership(owner);

    //Only Order contracts whose addresses are passed to this event will appear as listings on the exchange.
    SellOrderCreated(order);

    return order;
  }

  function calculateFee(uint amount) returns (uint) {
    return ((amount * 100) / feePercent) / 100;
  }

  function setFeePercent(uint _feePercent) external onlyOwner {
     if(_feePercent > 100)
      throw;
     feePercent = _feePercent;
  }

}
