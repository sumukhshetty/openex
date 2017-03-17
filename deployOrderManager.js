var OrderManager = artifacts.require("./OrderManager.sol");
var Wallet = artifacts.require("./Wallet.sol");
var ContractDirectory = artifacts.require("./ContractDirectory.sol");

module.exports = function(callback) {

var factory;
var owners = [];
var wallet;
var manager;
OrderManager.new(owners, 2, 10)
.then(function(_manager) {
  manager = _manager;
  return manager.factory();
})
.then(function(_factory) {
  factory = _factory;
  console.log('Created factory at: ' + factory);
  return ContractDirectory.deployed();
})
.then(function(directory) {
  console.log(directory);
  return directory.setFactoryAddress(factory);
})
.then(function() {
  process.exit(0)
})
.catch(function(e) {
  console.log(e);
  process.exit(1);
});


}
