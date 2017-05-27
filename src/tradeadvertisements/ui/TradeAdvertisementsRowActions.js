import {firebaseRef} from './../../index.js'


export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}


module.exports = {

  addEtherToContract: (amount, tradeAdvertisementId, contractAddress, web3) => (dispatch) => {
    console.log('amount to send: ' + amount);
    console.log('contract address: ' + contractAddress);
    dispatch(sendEtherState('sending'));
    var coinbase = web3.eth.coinbase;
    amount = Number(amount);
    // TODO: web3 stuff
    let value = web3.toWei(amount, 'ether');
/*    web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function(err, address) {
      if(!err) {
        dispatch(sendEtherState('sent'));
        firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid).once("value", function(snap){
          var userData = snap.val()
          firebaseRef.database().ref('/sellorders/' + userData.country+ '/' + tradeAdvertisementId + '/availableBalance')
          .once('value', function(snap) {
            console.log('amount: ' + amount);
            console.log('typeof amount: ' + typeof amount);
            console.log('snap.val(): ' + snap.val());
            console.log('typeof snap.val(): ' + typeof snap.val());
            firebaseRef.database().ref('/sellorders/' + userData.country+ '/' + tradeAdvertisementId + '/availableBalance')
            .set(snap.val() + amount);
          })
          
        })
      } else {
        if(err.message.includes('MetaMask Tx Signature: User denied')) {
          console.log('ERROR: User denied transaction');
          dispatch(sendEtherState('denied'))
        } else {
          console.log(err);
        }
      }
    })*/

  },

  resetSendEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  }
}
