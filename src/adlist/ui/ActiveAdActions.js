import SellOrderContract from '../../../build/contracts/SellOrder.json';
const contract = require('truffle-contract')

import {firebaseRef} from './../../index.js'

export const GET_AD = 'GET_AD'
function getAdData(adPayload, id) {
  return {
    type: GET_AD,
    payload: adPayload,
    id: id
  }
}

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}


module.exports = {
  getAd: (orderId, tradeType) => (dispatch) => {
    var url = tradeType === 'buy-ether' ? 'buyorders' : 'sellorders';
    firebaseRef.database()
      .ref(url+'/'+orderId)
      .on("value", function(snapshot){
        console.log('snapshot.val() [ActiveAdActions]');
        console.log(snapshot.val());
        dispatch(getAdData(snapshot.val(), orderId))
      })
  },

  addEtherToContract: (amount, orderId, contractAddress, web3) => (dispatch) => {
    console.log('amount to send: ' + amount);
    console.log('contract address: ' + contractAddress);
    dispatch(sendEtherState('sending'));
    var coinbase = web3.eth.coinbase;
    let value = web3.toWei(amount, 'ether');
    web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function(err, address) {
      if(!err) {
        dispatch(sendEtherState('sent'));
        // const order = contract(SellOrderContract);
        // order.setProvider(web3.currentProvider);
        // var orderInstance;
        // order.at(contractAddress)
        //   .then(function (_order) {
        //     orderInstance = _order;
        //     return orderInstance.availableFunds();
        //   })
        //   .then(function(balance) {
        //     let newBalance = web3.fromWei(balance, 'ether').toNumber() + amount;
        //     firebaseRef.database().ref('/sellorders/' + orderId + '/availableBalance')
        //     .set(newBalance)
        //     .then(function() {
        //       dispatch(sendEtherState('sent'));
        //     });
        //   })
      } else {
        if(err.message.includes('MetaMask Tx Signature: User denied')) {
          console.log('ERROR: User denied transaction');
          dispatch(sendEtherState('denied'))
        } else {
          console.log(err);
        }
      }
    })

  },

  resetSendEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  }
}
