pragma solidity ^0.4.2;

import "./zeppelin/ownership/Ownable.sol";
import "./zeppelin/SafeMath.sol";

contract SellOrder is Ownable, SafeMath {

  struct Order {
    uint amount;
    uint fee;
  }

  mapping(address => Order) public buyers;
  address public seller;
  uint public availableFunds;
  uint feePercent;

  function SellOrder(address _seller, uint _feePercent) {
    seller = _seller;
    feePercent = _feePercent;
    availableFunds = 0;
  }

  function () payable {
    availableFunds += msg.value;
  }

  //refactor into one event Order with param string type?
  event OrderAdded(address seller, address buyer, uint amount);
  event OrderCancelled(address seller, address buyer, uint amount);
  event OrderCompleted(address seller, address buyer, uint amount);

  function calculateFee(uint amount) returns (uint) {
    return ((amount * 100) / feePercent) / 100;
  }

  function addOrder(address buyer, uint amount) {
    uint fee = calculateFee(amount);
    if(msg.sender != seller || (amount+fee) > availableFunds || buyers[buyer].amount > 0)
      throw;

    buyers[buyer].amount = amount;
    buyers[buyer].fee = fee;
    availableFunds -= (amount+fee);
    OrderAdded(seller, buyer, amount);
  }

  function cancelOrder(address buyer) {
    if(msg.sender != buyer && msg.sender != owner)
      throw;

    if(buyers[buyer].amount == 0)
      throw;

    availableFunds += buyers[buyer].amount + buyers[buyer].fee;

    OrderCancelled(seller, buyer, buyers[buyer].amount);

    buyers[buyer].amount = 0;
    buyers[buyer].fee = 0;
  }

  function completeOrder(address buyer) {
    if(msg.sender != seller && msg.sender != owner)
      throw;

    if(!buyer.send(buyers[buyer].amount))
      throw;

    if(!owner.send(buyers[buyer].fee))
      throw;

    OrderCompleted(seller, buyer, buyers[buyer].amount);

    buyers[buyer].amount = 0;
    buyers[buyer].fee = 0;
  }

}
