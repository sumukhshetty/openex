var Authentication = artifacts.require("./Authentication.sol");
var ContractDirectory = artifacts.require("./ContractDirectory.sol");

module.exports = function(deployer) {
  deployer.deploy(Authentication);
  deployer.deploy(ContractDirectory);
};
