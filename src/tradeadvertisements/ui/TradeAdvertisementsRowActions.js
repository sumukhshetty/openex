import {firebaseRef} from './../../index.js'

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}


module.exports = {

  addEtherToContract: (amount, uid, contractAddress, web3) => (dispatch) => {
    console.log('amount to send: ' + amount);
    console.log('contract address: ' + contractAddress);
    dispatch(sendEtherState('sending'));
    var coinbase = web3.eth.coinbase;
    amount = Number(amount);
    let value = web3.toWei(amount, 'ether');
    web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function(err, txHash) {
      if(!err) {
        dispatch(sendEtherState('sent'));
        firebaseRef.database().ref('/users/'+uid+'/balanceUpdateTx')
          .set(txHash);
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
