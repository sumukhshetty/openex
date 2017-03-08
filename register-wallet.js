var EscrowFactory = artifacts.require("./EscrowFactory.sol");
var Wallet = artifacts.require("./Wallet.sol");

module.exports = function(callback) {

var factory;
var owners = [];
var wallet;
EscrowFactory.deployed()
.then(function(_factory) {
  factory = _factory;
  return Wallet.new(owners, 2, 1)
})
.then(function(_wallet) {
  wallet = _wallet;
  return factory.setWalletAddress(wallet.address);
})
.then(function(txHash) {
  console.log('Registered Wallet to EscrowFactory successfully.');
  process.exit(0)
})
.catch(function(e) {
  console.log(e);
  process.exit(1);
});

}
