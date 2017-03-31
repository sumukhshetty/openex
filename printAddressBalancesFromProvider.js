var HDWalletProvider = require("truffle-hdwallet-provider");
var fs = require("fs");
var path = require("path");

var mnemonic = fs.readFileSync(path.join("./secrets/", "deploy_mnemonic.key"), {encoding: "utf8"}).trim();

 var provider = new HDWalletProvider(mnemonic, "http://localhost:8545");
 console.log(provider);
 process.exit(0);
