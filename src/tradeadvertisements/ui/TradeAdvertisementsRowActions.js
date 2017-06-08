import {firebaseRef} from './../../index.js'

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}


module.exports = {

  addEtherToContract: (amount, tradeAdvertisementId, contractAddress, web3, user) => (dispatch) => {
    dispatch(sendEtherState('sending'));
    var coinbase = web3.eth.coinbase;
    amount = Number(amount);
    let value = web3.toWei(amount, 'ether');
    web3.eth.sendTransaction({from: coinbase, to: user.profile.orderBookAddress, value: value}, function(err, address) {
      if(!err) {
        dispatch(sendEtherState('sent'));
        firebaseRef.database().ref('/selltradeadvertisements/' + user.profile.country+ '/' + tradeAdvertisementId + '/availableBalance')
        .once('value', function(snap) {
          firebaseRef.database().ref('/selltradeadvertisements/' + user.profile.country+ '/' + tradeAdvertisementId + '/availableBalance')
          .set(snap.val() + amount);
        })
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
