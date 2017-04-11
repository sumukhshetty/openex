import {firebaseRef} from './../../index.js'

export const GET_SELL_ORDERS = 'GET_SELL_ORDERS'
function getSellOrders(sellOrdersPayload) {
  return {
    type: GET_SELL_ORDERS,
    payload: sellOrdersPayload
  }
}

module.exports = {
  startListeningToSellOrders: () => (dispatch, getState) =>{
    firebaseRef.database().ref('sellorders').on("value", function(snapshot){
      dispatch({ type: "RECEIVE_SELL_ORDERS_DATA", payload: snapshot.val() });
    })
  },
  sellOrders: (user) => (dispatch) => {
    firebaseRef.database().ref('sellorders')
    .orderByChild('status').equalTo('Initiated')
      .once('value', function(snapshot){
        console.log(snapshot.val());
        dispatch(getSellOrders(snapshot.val()))
      })
  }
}
