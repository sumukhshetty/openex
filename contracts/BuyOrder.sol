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
  /*uint endBlock;
  uint TIME_LIMIT = 386; //about 90 minutes with a 14 sec block time*/

  function BuyOrder(address _buyer, address _seller, uint _amount, uint _fee) {
    buyer = _buyer;
    seller = _seller;
    amount = _amount;
    fee = _fee;
    /*endBlock = block.number + TIME_LIMIT;*/

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

  //rework fee structure so both sides pay.
  function payoutToBuyer() stateIs(State.InEscrow) {
    if(msg.sender != seller && msg.sender != owner)
      throw;

    if(!buyer.send(amount))
      throw;

    selfdestruct(owner);
  }

  //If the seller does not receive payment, the ether can be refunded
  //triggers for self destructing:
  // 1. 90 minute time limit
  // 2. Buyer cancels within 90 minutes
  function refundToSeller() stateIs(State.InEscrow) {
    if(msg.sender != buyer && msg.sender != owner)
      throw;
    selfdestruct(seller);
  }

  /*function refundAfterTimeLimit() stateIs(State.InEscrow) {
    if(msg.sender != seller && block.number < endBlock)
      throw;
    selfdestruct(seller);
  }*/

  //cancel order before escrow

  modifier stateIs(State _state) {
    if(state != _state)
      throw;
    _;
  }

}
