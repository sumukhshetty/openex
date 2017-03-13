var OrderManager = artifacts.require("./OrderManager.sol");
var Wallet = artifacts.require("./Wallet.sol");

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
  process.exit(0)
})
.catch(function(e) {
  console.log(e);
  process.exit(1);
});


}
