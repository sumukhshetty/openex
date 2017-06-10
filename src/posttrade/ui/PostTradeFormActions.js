import {firebaseRef} from './../../index.js'
import OrderBookFactory from './../../../contracts/abi/OrderBookFactory'
import factoryAddress from './../../contract_addresses/orderfactory.js'
const contract = require('truffle-contract')
// New
export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}


export function userCreatesBuyTradeAdvertisement(tradeDetails, web3, user){
  return function(dispatch){
    var newAdvertisement = firebaseRef.database().ref('/buytradeadvertisements/'+ user.profile.country)
      .push(tradeDetails, function(error){
        firebaseRef.database().ref('/users/' + user.data.uid + '/advertisements/buyether/' + 
          newAdvertisement.key + '/tradetype').set('buy-ether')
      })
  }
}


export function userCreatesSellTradeAdvertisement(tradeDetails, web3, user){
  return function(dispatch){
    console.log("PostTradeFormActions.userCreatesSellTradeAdvertisement")
    console.log(user.profile.country)
    console.log(web3.eth.coinbase)
    dispatch(sendEtherState('sending'));
    try {
      const factory = contract(OrderBookFactory);
      console.log(factory)
      factory.setProvider(web3.currentProvider);
      var factoryInstance;
      factory.at(factoryAddress.kovanAddress)
      .then(function (_factory) {
        console.log('got the factory')
        factoryInstance = _factory
        _factory.createETHOrderBook(user.profile.country, {from:web3.eth.coinbase})
        .then(function(txHash){
          console.log(txHash)
          console.log('created the ETHOrderBookContract')
          firebaseRef.database().ref('/users/'+user.data.uid+'/orderBookAddress')
          .set(txHash['logs'][0]['args']['orderAddress'])
          var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
            .push(tradeDetails, function(err){
              firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
                  newAdvertisement.key + '/tradetype').set('sell-ether')
            })
        })
      }).catch(function(error){
        console.log()
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function resetEtherState() {
  return function(dispatch) {
    dispatch(sendEtherState('init'));
  }
}
