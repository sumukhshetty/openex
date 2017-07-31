pragma solidity ^0.4.11;

import "./zeppelin/ownership/Ownable.sol";
import "./EZEtherExchange.sol";

contract DisputeInterface is Ownable {

  EZEtherExchange exchange;

  function setExchange(address _exchange) {
    exchange = EZEtherExchange(_exchange);
  }

  function setDisputed(address seller, string uid) onlyDisputeResolver {
    exchange.setDisputed(seller, uid);
  }

  function resolveDisputeSeller(string uid, address seller) onlyDisputeResolver {
    exchange.resolveDisputeSeller(seller, uid);
  }

  function resolveDisputeBuyer(string uid, address seller) onlyDisputeResolver {
    exchange.resolveDisputeBuyer(seller, uid);
  }

  modifier onlyDisputeResolver {
    require(msg.sender == exchange.disputeResolver());
    _;
  }

}
