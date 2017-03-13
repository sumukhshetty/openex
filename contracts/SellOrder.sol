pragma solidity ^0.4.2;

import "./zeppelin/ownership/Ownable.sol";
import "./zeppelin/SafeMath.sol";

contract SellOrder is Ownable, SafeMath {

  mapping(address => uint) public buyers;
  address public seller;

  uint public availableFunds;

  //TODO: figure out fee structure for Sell Orders
  uint private fee;

  function SellOrder(address _seller) {
    seller = _seller;
    availableFunds = 0;
  }

  function () payable {
    availableFunds += msg.value;
  }

  //refactor into one event Order with param string type?
  event OrderAdded(address seller, address buyer, uint amount);
  event OrderCancelled(address seller, address buyer, uint amount);
  event OrderCompleted(address seller, address buyer, uint amount);

  function addOrder(address buyer, uint amount) {
    if(msg.sender != seller || amount > availableFunds || buyers[buyer] > 0)
      throw;

    buyers[buyer] = amount;
    availableFunds -= amount;
    OrderAdded(seller, buyer, amount);
  }

  function cancelOrder(address buyer) onlyOwner {
    if(buyers[buyer] == 0)
      throw;

    availableFunds += buyers[buyer];

    OrderCancelled(seller, buyer, buyers[buyer]);

    buyers[buyer] = 0;
  }

  function completeOrder(address buyer) {
    if(msg.sender != seller && msg.sender != owner)
      throw;

    if(!buyer.send(buyers[buyer]))
      throw;

    OrderCompleted(seller, buyer, buyers[buyer]);

    buyers[buyer] = 0;
  }

}
