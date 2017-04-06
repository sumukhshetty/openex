var OrderManager = artifacts.require("./OrderManager.sol");
var Wallet = artifacts.require("./Wallet.sol");
var ContractDirectory = artifacts.require("./ContractDirectory.sol");

module.exports = function(callback) {

var factory, directory;
var owners = [];
var wallet;
var manager;
OrderManager.new(owners, 2, 10)
.then(function(_manager) {
  manager = _manager;
  console.log('Created manager at: ' + manager);
  return manager.factory();
})
.then(function(_factory) {
  factory = _factory;
  console.log('Created factory at: ' + factory);
  return ContractDirectory.new();
})
.then(function(_directory) {
  console.log('Created directory at: ' + _directory);
  directory = _directory;
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
