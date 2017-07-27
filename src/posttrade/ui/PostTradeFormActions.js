import {firebaseRef, raven} from './../../index.js'
import * as contractAbis from './../../contract_addresses/contractAbi'
import {notify} from 'react-notify-toast'

// New
export const ETHER_SEND_STATE = 'ETHER_SEND_STATE'
function sendEtherState(etherStatePayload) {
  return {
    type: ETHER_SEND_STATE,
    payload: etherStatePayload
  }
}

function userSellerInterface(sellerInterface) {
  return {
  type: 'SET_SELLER_INTERFACE',
  payload: sellerInterface
  }
}

function setTxHash(txHash){
  return {
    type: 'SET_TX_HASH',
    payload: txHash
  }
}

function clearTxHash(){
  return{
    type: 'CLEAR_TX_HASH'
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

export function userCreatesSellTradeAdvertisement(tradeDetails, web3, sellerInterfaceFactory, user){
  return function(dispatch){
    firebaseRef.database().ref('/sellerInterface/'+user.profile.country+'/'+user.data.uid+'/sellerInterfaceAddress').once('value', function(snap){
      if(snap.val()){
        var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
                  .push(tradeDetails, function(err){
                    firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
                        newAdvertisement.key + '/tradetype').set('sell-ether')
                  })
      } else {
        try {
          if(web3.eth.coinbase) {
            var coinbase = web3.eth.coinbase
          } else {
            throw new Error("Undefined Wallet Address")
          }
          dispatch(sendEtherState('sending'))
          var event = sellerInterfaceFactory.data.SellerInterfaceCreated({seller:coinbase})
          event.watch((error, result) => {
              const SellerInterface = web3.eth.contract(contractAbis.SellerInterfaceAbi)
            const _instance = SellerInterface.at(result.args.orderAddress)

            firebaseRef.database().ref('/sellerInterface/'+user.profile.country+'/'+user.data.uid+'/sellerInterfaceAddress')
            .set(result.args.orderAddress)
            var newAdvertisement = firebaseRef.database().ref('/selltradeadvertisements/'+ user.profile.country)
                  .push(tradeDetails, function(err){
                    firebaseRef.database().ref('/users/'+user.data.uid+'/advertisements/sellether/' +
                        newAdvertisement.key + '/tradetype').set('sell-ether')
                  })
            event.stopWatching()
            dispatch(userSellerInterface(_instance))
            dispatch(sendEtherState('init'))
            dispatch(clearTxHash())
          })

          sellerInterfaceFactory.data.createSellerInterface({from: coinbase}, function(error, result){
            if(!error){
              dispatch(sendEtherState('waiting-for-tx-to-mine'));
              dispatch(setTxHash(result))
            } else {
              console.log(error)
              dispatch(sendEtherState('init'))
            }
          })
        } catch (error) {
          console.log(error)
          if (error.message ==='Undefined Wallet Address'){
            notify.show("Please unlock your MetaMask account")
          } else {
            raven.captureException(error)
          }
        }
      }
    })
  }
}

export function resetEtherState() {
  return function(dispatch) {
    dispatch(sendEtherState('init'));
  }
}
