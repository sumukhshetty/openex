pragma solidity ^0.4.2;

import "./zeppelin/ownership/Ownable.sol";
import "./zeppelin/SafeMath.sol";

contract BuyOrder is Ownable, SafeMath {
  address private buyer;
  address private seller;

  //amout is in wei
  uint public amount;

  enum State { Open, InEscrow }

  State public state;
  uint private fee;

  function BuyOrder(address _buyer, address _seller, uint _amount, uint _fee) {
    buyer = _buyer;
    seller = _seller;
    amount = _amount;
    fee = _fee;

    state = State.Open;
  }


  event InEscrow(uint block);

  function () payable {
    pay();
  }

  function pay() payable stateIs(State.Open) {
    if(msg.value != safeAdd(amount, fee))
      throw;

    state = State.InEscrow;
    InEscrow(block.number);
  }

  function payoutToBuyer() stateIs(State.InEscrow) {
    if(msg.sender != seller && msg.sender != owner)
      throw;

    if(!buyer.send(amount))
      throw;

    selfdestruct(owner);
  }

  //If the seller does not receive payment, the ether can be refunded
  function refundToSeller() stateIs(State.InEscrow) {
    if(msg.sender != buyer && msg.sender != owner)
      throw;
    selfdestruct(seller);
  }

  modifier stateIs(State _state) {
    if(state != _state)
      throw;
    _;
  }

}
