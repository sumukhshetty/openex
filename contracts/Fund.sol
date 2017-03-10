pragma solidity ^0.4.2;

import "./zeppelin/ownership/Shareable.sol";
import "./zeppelin/payment/PullPayment.sol";

contract Fund is Shareable, PullPayment {

  mapping(address => uint) public shares;
  mapping(address => bool) isAccount;
  address [] accounts;
  uint totalShares;

  function Fund(address[] _owners, uint _required, address[] _accounts) Shareable(_owners, _required) {
    accounts = _accounts;
    totalShares = accounts.length - 1;
    for(uint i = 0; i < accounts.length; i++) {
      isAccount[accounts[i]] = true;
      shares[accounts[i]] = 1;
    }
  }

  function () payable {
    if(msg.value == 0)
      throw;

    for(uint i = 0; i < accounts.length; i++) {
      uint percentage = (shares[accounts[i]] * 100) / totalShares;
      uint dividend = (msg.value * percentage) / 100;
      asyncSend(accounts[i], dividend);
    }
  }

  function addShares(uint amount, address account) checkAccount(account) onlymanyowners(sha3(msg.data)) external {
    shares[account] += amount;
    totalShares += amount;
  }

  function removeShares(uint amount, address account) checkAccount(account) onlymanyowners(sha3(msg.data)) external {
    shares[account] += amount;
    totalShares += amount;
  }

  function changeAccount(address oldAddress, address newAddress) checkAccount(oldAddress) onlymanyowners(sha3(msg.data)) {

  }

  modifier checkAccount(address account) {
    if(!isAccount[account])
      throw;
    _;
  }

}
