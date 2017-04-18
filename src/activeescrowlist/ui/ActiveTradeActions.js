import {firebaseRef} from './../../index.js'

export const GET_ACTIVE_TRADE = 'GET_ACTIVE_TRADE'
function getActiveTradeData(activeTradesPayload, id) {
  return {
    type: GET_ACTIVE_TRADE,
    payload: activeTradesPayload,
    id: id
  }
}


module.exports = {
  getActiveTrade: (orderId, tradeType) => (dispatch) => {
    var url = tradeType === 'buy-ether' ? 'buyorders' : 'purchaserequests';
    firebaseRef.database()
      .ref(url+'/'+orderId)
      .once("value", function(snapshot){
        console.log('snapshot.val() [ActiveTradeActions]');
        console.log(snapshot.val());
        dispatch(getActiveTradeData(snapshot.val(), orderId))
      })
  }
}
