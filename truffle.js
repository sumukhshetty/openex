var HDWalletProvider = require("truffle-hdwallet-provider");
var fs = require("fs");
var path = require("path")

var mnemonic = fs.readFileSync(path.join("./secrets/", "deploy_mnemonic.key"), {encoding: "utf8"}).trim();

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
      network_id: 3
    },
    mainnet: {
      provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"),
      network_id: 1
    }

  }
};
