pragma solidity ^0.4.11;

import "./zeppelin/math/SafeMath.sol";
import "./zeppelin/ownership/Ownable.sol";

contract EZEtherExchange is Ownable {
  using SafeMath for uint;

  enum Status { None, Open, Complete, Disputed, ResolvedSeller, ResolvedBuyer }

  address public disputeResolver;
  address public disputeInterface;

  function setDisputeInterface(address _disputeInterface) onlyOwner external {
     disputeInterface = _disputeInterface;
  }

  function setDisputeResolver(address _disputeResolver) onlyOwner external {
     disputeResolver = _disputeResolver;
  }

  address public feeRecipient;
  mapping(address => address) specialFeeRecipient;

  function getFeeRecipient(address seller) constant returns (address) {
    if(specialFeeRecipient[seller] != address(0)) {
      return specialFeeRecipient[seller];
    }
    return feeRecipient;
  }

  function setFeeRecipient(address _feeRecipient) onlyOwner {
     feeRecipient = _feeRecipient;
  }

  uint public feePercent;
  mapping(address => uint256) specialFeeRates;

  function getFeePercent(address seller) internal constant returns (uint) {
    if(specialFeeRates[seller] > 0) {
      return specialFeeRates[seller];
    }
    return feePercent;
  }

  function getFeePercent() external constant returns (uint) {
    if(specialFeeRates[msg.sender] > 0) {
      return specialFeeRates[msg.sender];
    }
    return feePercent;
  }

  function setFeePercent(uint _feePercent) onlyOwner external {
     feePercent = _feePercent;
  }

  function setSpecialFeePercent(address seller, uint _feePercent) onlyOwner external {
     specialFeeRates[seller] = _feePercent;
  }

  mapping(address => uint) specialMinimumAmounts;
  mapping(address => uint) specialMaximumAmounts;
  uint public minimumAmount;
  uint public maximumAmount;

  function getMinAmount(address seller) internal constant returns (uint) {
    if(specialMinimumAmounts[seller] > 0) {
      return specialMinimumAmounts[seller];
    }
    return minimumAmount;
  }

  function getMaxAmount(address seller) internal constant returns (uint) {
    if(specialMaximumAmounts[seller] > 0) {
      return specialMaximumAmounts[seller];
    }
    return maximumAmount;
  }

  function getMinAmount() external constant returns (uint) {
    if(specialMinimumAmounts[msg.sender] > 0) {
      return specialMinimumAmounts[msg.sender];
    }
    return minimumAmount;
  }

  function getMaxAmount() external constant returns (uint) {
    if(specialMaximumAmounts[msg.sender] > 0) {
      return specialMaximumAmounts[msg.sender];
    }
    return maximumAmount;
  }

  function setSpecialLimits(address seller, uint min, uint max) onlyOwner external {
    require(min < max);
    specialMinimumAmounts[seller] = min;
    specialMaximumAmounts[seller] = max;
  }

  function setLimits(uint min, uint max) onlyOwner external {
    require(min < max);
    minimumAmount = min;
    maximumAmount = max;
  }

  struct Order {
    address buyer;
    uint amount;
    uint fee;
    Status status;
  }

  mapping(address => mapping(string => Order)) orders;

  function calculateFee(uint amount, address seller) internal returns (uint) {
    //((amount * 100) * feePercent) / 10000
    return ((amount.mul(100)).mul(getFeePercent(seller))).div(1000000);
  }

  event OrderAdded(string uid, address seller, address buyer, uint amount, uint price, string currency);

  function addOrder(string uid, address buyer, uint _amount, uint price, string currency) payable external {
    uint fee = calculateFee(_amount, msg.sender);

    require(
      (!isContract(buyer)) &&
      (msg.value == (_amount + fee)) &&
      (_amount >= getMinAmount(msg.sender)) &&
      (_amount <= getMaxAmount(msg.sender)) &&
      (orders[msg.sender][uid].status == Status.None)
      );

    orders[msg.sender][uid].buyer = buyer;
    orders[msg.sender][uid].amount = _amount;
    orders[msg.sender][uid].fee = fee;
    orders[msg.sender][uid].status = Status.Open;

    OrderAdded(uid, msg.sender, buyer, _amount, price, currency);
  }

  event OrderCompleted(string uid, address seller, address buyer, uint amount);
  event DisputeResolved(string uid, address seller, address buyer, string resolvedTo);

  function completeOrder(string uid) external {
    require(
      (orders[msg.sender][uid].status == Status.Open || orders[msg.sender][uid].status == Status.Disputed)
    );

    orders[msg.sender][uid].buyer.transfer(orders[msg.sender][uid].amount);
    getFeeRecipient(msg.sender).transfer(orders[msg.sender][uid].fee);

    if(orders[msg.sender][uid].status == Status.Open) {
      orders[msg.sender][uid].status = Status.Complete;
      OrderCompleted(uid, msg.sender, orders[msg.sender][uid].buyer, orders[msg.sender][uid].amount);
    } else {
      orders[msg.sender][uid].status = Status.ResolvedBuyer;
      DisputeResolved(uid, msg.sender, orders[msg.sender][uid].buyer, 'buyer');
    }
  }

  function setDisputed(address seller, string uid) onlyDisputeInterface external {
    require(orders[seller][uid].status == Status.Open);
    orders[seller][uid].status = Status.Disputed;
    OrderDisputed(seller, uid, orders[seller][uid].buyer);
  }

  function resolveDisputeBuyer(address seller, string uid) onlyDisputeInterface external {
    require(orders[seller][uid].status == Status.Disputed);
    orders[seller][uid].buyer.transfer(orders[seller][uid].amount);
    getFeeRecipient(seller).transfer(orders[seller][uid].fee);
    DisputeResolved(uid, seller, orders[seller][uid].buyer, 'buyer');
  }

  event OrderDisputed(address seller, string uid, address buyer);

  function resolveDisputeSeller(address seller, string uid) onlyDisputeInterface external {
    require(orders[seller][uid].status == Status.Disputed);
    seller.transfer(orders[seller][uid].amount.add(orders[seller][uid].fee));
    orders[seller][uid].status = Status.ResolvedSeller;
    DisputeResolved(uid, seller, orders[seller][uid].buyer, 'seller');
  }

  modifier onlyDisputeInterface {
    require(msg.sender == disputeInterface);
    _;
  }

  function isContract(address addr) internal returns (bool) {
    uint size;
    assembly { size := extcodesize(addr) }
    return size > 0;
  }

}
