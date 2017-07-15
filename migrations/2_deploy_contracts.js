var ContractDirectory = artifacts.require("./ContractDirectory.sol");
//var Ownable = artifacts.require("./OrderBookFactory")

module.exports = function(deployer) {
  deployer.deploy(ContractDirectory);
  //deployer.deploy(OrderBookFactory)
};
