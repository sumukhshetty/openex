import {firebaseRef} from './../../index.js'

export const GET_ACTIVE_TRADE = 'GET_ACTIVE_TRADE'
function getActiveTradeData(activeTradesPayload) {
  return {
    type: GET_ACTIVE_TRADE,
    payload: activeTradesPayload
  }
}


module.exports = {
  getActiveTrade: (orderId) => (dispatch) => {
    firebaseRef.database()
      .ref('/buyorders/'+orderId)
      .once("value", function(snapshot){
        console.log('snapshot.val() [ActiveTradeActions]');
        console.log(snapshot.val());
        dispatch(getActiveTradeData(snapshot.val()))
      })
  }
}
