import {raven} from './../../index.js'
import {notify} from 'react-notify-toast'

function setAvailableBalance(availableBalance){
  return {
    type: 'SET_AVAILABLE_BALANCE',
    payload: availableBalance
  }
}

function setContractBalance(contractBalance){
  return {
    type: 'SET_CONTRACT_BALANCE',
    payload: contractBalance
  }
}

export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

module.exports={
  getAvailableBalance: (ethorderbook, web3) => (dispatch) => {
    ethorderbook.availableBalance(function(error, result){
      if(!error){
        console.log("we got an availableBalance")
        console.log(result)
        var availableBalance = web3.fromWei(result, 'ether')
        console.log(availableBalance.toNumber())
        dispatch(setAvailableBalance(availableBalance))
        //dispatch(actions.getAvailableBalance(availableBalance.toNumber()))
      }
    })
  },
  getContractBalance: (ethorderbook, web3) => (dispatch) => {
    console.log('ManageContractActions.getContractBalance')
    console.log(ethorderbook, web3)
    web3.eth.getBalance(ethorderbook.address, function(error, result){
      if(!error){
        console.log("we got a contract balance")
        var contractBalance = web3.fromWei(result, 'ether')
        dispatch(setContractBalance(contractBalance.toNumber()))
      }
    })
  },
  addEther: (addAmount, contractAddress, web3, ethOrderBook) => (dispatch) => {
    console.log("ManageContractActions.addEther")
    dispatch(sendEtherState('sending'));
    try {
      if(web3.eth.coinbase){
        var coinbase = web3.eth.coinbase;
      } else {
        console.log("we dont have an address")
        throw new Error("Wallet Address Undefined")
      }
      var amount = Number(addAmount);
      let value = web3.toWei(amount, 'ether');
      if (contractAddress && ((typeof contractAddress)==="string") && (contractAddress.length === 42)) {
        ethOrderBook.pay({from: coinbase, value: value}, function(err, txHash) {
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
  withdrawEther: (withdrawAmount, contractAddress, web3, ethOrderBook) => (dispatch) => {
    dispatch(sendEtherState('sending'))
    try {
      if(web3.eth.coinbase){
        var coinbase = web3.eth.coinbase
      } else {
        console.log("we dont have an address")
        throw new Error("Wallet Address Undefined") 
      }
      var amount = Number(withdrawAmount)
      let value = web3.toWei(amount, 'ether')
      if (contractAddress && ((typeof contractAddress)==="string") && (contractAddress.length === 42)) {
        ethOrderBook.withdraw(value, {from: coinbase}, function(err, txHash) {
          if(!err) {
            dispatch(sendEtherState('sent'));
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