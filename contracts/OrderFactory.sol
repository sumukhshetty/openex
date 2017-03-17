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

  //Only contracts whose addresses are logged by this event will appear on the exchange.
  event OrderCreated(address seller, address orderAddress, string orderType);

  function createBuyOrder(address _buyer, uint amount) external returns (address) {
    BuyOrder order = new BuyOrder(_buyer, msg.sender, amount, calculateFee(amount));

    order.transferOwnership(owner);

    OrderCreated(msg.sender, order, "buy");

    return order;
  }

  function createSellOrder() external returns (address) {
    SellOrder order = new SellOrder(msg.sender, feePercent);

    order.transferOwnership(owner);

    OrderCreated(msg.sender, order, "sell");

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
