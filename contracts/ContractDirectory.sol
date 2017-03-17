pragma solidity ^0.4.2;
import "./zeppelin/ownership/Ownable.sol";

contract ContractDirectory is Ownable {
  address public orderFactoryAddress;

  function ContractDirectory() {

  }

  function setFactoryAddress(address _orderFactoryAddress) onlyOwner {
    orderFactoryAddress = _orderFactoryAddress;
  }
}
