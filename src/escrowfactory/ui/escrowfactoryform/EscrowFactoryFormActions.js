import EscrowFactoryContract from '../../../../build/contracts/EscrowFactory.json'
//import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const ESCROWFACTORY_CONTRACT_CREATED = 'ESCROWFACTORY_CONTRACT_CREATED'
function escrowContractCreated(contractPayload) {
  return {
    type: ESCROWFACTORY_CONTRACT_CREATED,
    payload: contractPayload
  }
}

export function escrowFactory(web3, factoryInputs) {
  console.log(factoryInputs);
  return function(dispatch) {
    // Using truffle-contract we create the authentication object.
    const factory = contract(EscrowFactoryContract);
    factory.setProvider(web3.currentProvider);

    // Declaring this for later so we can chain functions on Authentication.
    var factoryInstance;
    var gasCost;

    // Get current ethereum wallet. TODO: Wrap in try/catch.
    var coinbase = web3.eth.coinbase;
    console.log("ok lets go get this")
    // TODO add in EscrowFactory contract interaction
    factory.deployed()
    .then(function(instance) {
      factoryInstance = instance;

      return factoryInstance.createEscrow.estimateGas(factoryInputs.buyerAddress, factoryInputs.sellerAddress, web3.toWei(factoryInputs.etherAmount, 'ether'))
    })
    .then(function(cost) {
      gasCost = cost;
      console.log("estimated gas cost of creating an escrow: " + gasCost);
      return factoryInstance.createEscrow(factoryInputs.buyerAddress, factoryInputs.sellerAddress, web3.toWei(factoryInputs.etherAmount, 'ether'),
        {from: coinbase, gas: gasCost + 100000});
    })
    .then(function(txHash) {
      console.log("Escrow Created!");
    })

/*    authentication.deployed().then(function(instance) {
      authenticationInstance = instance

      // Attempt to login user.
      authenticationInstance.update(name, {from: coinbase})
      .catch(function(result) {
        // If error...
      })
      .then(function(result) {
        // If no error, update user.

        dispatch(escrowContractCreated({"name": name}))

        alert('Name updated!')
      })
    })*/
  }
}
