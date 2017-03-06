import AuthenticationContract from '../../../../build/contracts/Authentication.json'
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
  return function(dispatch) {
    // Using truffle-contract we create the authentication object.
    const authentication = contract(AuthenticationContract)
    //authentication.setProvider(web3.currentProvider)

    // Declaring this for later so we can chain functions on Authentication.
    var authenticationInstance

    // Get current ethereum wallet. TODO: Wrap in try/catch.
    var coinbase = web3.eth.coinbase;
    console.log("ok lets go get this")
    // TODO add in EscrowFactory contract interaction
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
