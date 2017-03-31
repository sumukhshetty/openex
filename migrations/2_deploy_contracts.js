var ContractDirectory = artifacts.require("./ContractDirectory.sol");

module.exports = function(deployer) {
  deployer.deploy(ContractDirectory);
};
