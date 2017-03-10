pragma solidity ^0.4.4;

import "./OrderFactory.sol";
import "./zeppelin/MultisigWallet.sol";

contract OrderManager is MultisigWallet {

  OrderFactory public factory;

  function OrderManager(address [] _owners, uint _required, uint _daylimit) MultisigWallet(_owners, _required, _daylimit) payable {
    //set state vars

    factory = new OrderFactory();
  }

  function setFeePercent(uint fee) onlymanyowners(sha3(msg.data)) {
    factory.setFeePercent(fee);
  }

  //need to include this to inherit multisig
  function changeOwner(address _from, address _to) external { }



}
