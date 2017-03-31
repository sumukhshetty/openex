var HDWalletProvider = require("truffle-hdwallet-provider");
var fs = require("fs");
var path = require("path")
require('babel-register');
require('babel-polyfill');

var mnemonic = fs.readFileSync(path.join("./secrets/", "deploy_mnemonic.key"), {encoding: "utf8"}).trim();
//var kovan_mnemonic = fs.readFileSync(path.join("./secrets/", "kovan_deploy_mnemonic.key"), {encoding: "utf8"}).trim();

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    kovan:{
        provider: new HDWalletProvider(mnemonic, "http://localhost:8545"),
        network_id:42,
        host:"localhost",
        port:8545,
    }
    // mainnet: {
    //   provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/0xf4d8083560e1bde04c269132d2211d9b4c62305b"),
    //   network_id: 1
    // }

  }
};
