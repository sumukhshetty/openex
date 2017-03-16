//import EscrowFactoryContract from '../../../../build/contracts/EscrowFactory.json'
import { browserHistory } from 'react-router'
import {firebaseRef} from './../../index.js'

export const POST_TRADE = 'POST_TRADE'
function tradeCreated(tradePayload) {
  return {
    type: POST_TRADE,
    payload: tradePayload
  }
}

export function postTrade(postTradeDetails, web3, state) {
  return function(dispatch) {

    var currentdate = new Date().toString()
    if (postTradeDetails.tradeType === 'buy-ether'){
      var orderId = web3.sha3(state.user.data.uid + '-'+ currentdate)
      firebaseRef.database().ref("buyorders/" + state.user.data.uid + '/' + orderId).set(postTradeDetails);
    }
    dispatch(tradeCreated(postTradeDetails))
    browserHistory.push('/dashboard')
  }
}
