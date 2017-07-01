import {raven} from './../../index.js'

import {notify} from 'react-notify-toast'

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
    try {
      if(web3.eth.coinbase){
        var coinbase = web3.eth.coinbase;
      } else {
        console.log("we dont have an address")
        throw new Error("Wallet Address Undefined")
      }
    amount = Number(amount);
    let value = web3.toWei(amount, 'ether');
    if (contractAddress && ((typeof contractAddress)==="string") && (contractAddress.length === 42)) {
      web3.eth.sendTransaction({from: coinbase, to: contractAddress, value: value}, function(err, txHash) {
        if(!err) {
          dispatch(sendEtherState('sent'));
          /*firebaseRef.database().ref('/users/'+uid+'/balanceUpdateTx')
            .set(txHash);*/
        } else {
          if(err.message.includes('MetaMask Tx Signature: User denied')) {
            console.log('ERROR: User denied transaction');
            dispatch(sendEtherState('init'))
          } else {
            console.log(err);
          }
        }
      })
    } else {
      console.log("invalid contract address")
      throw new Error("Invalid Contract Address")
    } 


    } catch (error) {
      if (error.message==='Wallet Address Undefined'){
        console.log(error)
        notify.show("please unlock metmask")
      } else if (error.message === 'Invalid Contract Address') {
        raven.captureException(error)
      } else {
        console.log(error.message)
        notify.show("please unlock metmask")
        raven.captureException(error)
      }

    }


  },

  resetSendEtherState: () => (dispatch) => {
    dispatch(sendEtherState('init'));
  }
}
