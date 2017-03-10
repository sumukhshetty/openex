//import EscrowFactoryContract from '../../../../build/contracts/EscrowFactory.json'
//import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const POST_TRADE = 'POST_TRADE'
function tradeCreated(tradePayload) {
  return {
    type: POST_TRADE,
    payload: tradePayload
  }
}

export function postTrade(postTradeDetails, web3) {
  console.log(postTradeDetails);
  return function(dispatch) {
    // Using truffle-contract we create the authentication object.
    // TODO check what kind of trade is being made and either get the contract
    // or make an entry in the firebase db
    //const factory = contract(EscrowFactoryContract);
    //factory.setProvider(web3.currentProvider);

    // Declaring this for later so we can chain functions on Authentication.
    var factoryInstance;
    var gasCost;

    // Get current ethereum wallet. TODO: Wrap in try/catch.
    var coinbase = web3.eth.coinbase;
    console.log("ok lets go get this")


  }
}
