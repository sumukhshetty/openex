pragma solidity ^0.4.4;

import "./Escrow.sol";
import "./zeppelin/ownership/Ownable.sol";

contract EscrowFactory is Ownable {

  uint private feePercent;
  uint constant INIT_FEE_PERCENT = 10;
  address wallet = 0x0;

  function EscrowFactory() {
    feePercent = INIT_FEE_PERCENT;
  }

  event EscrowCreated(uint blocks, address escrowAddress);

  function createEscrow(address _buyer, address _seller, uint _amount) onlyOwner external returns (address) {
    if(wallet == 0x0)
      throw;
    uint fee = ((_amount * 100) / feePercent) / 100;
    Escrow escrow = new Escrow(_buyer, _seller, wallet, _amount, fee);

    EscrowCreated(block.number, escrow);

    escrow.transferOwnership(owner);

    return escrow;
  }

  function setFeePercent(uint _feePercent) external onlyOwner {
     if(_feePercent > 100)
      throw;
     feePercent = _feePercent;
  }

  function setWalletAddress(address _wallet) external onlyOwner {
    wallet = _wallet;
  }



}
