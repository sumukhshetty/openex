import {firebaseRef} from './../../index.js'

export const GET_BUY_ORDERS = 'GET_BUY_ORDERS'
function getBuyOrders(buyOrdersPayload) {
  return {
    type: GET_BUY_ORDERS,
    payload: buyOrdersPayload
  }
}

module.exports = {
  startListeningToBuyOrders: () => (dispatch, getState) =>{
    firebaseRef.database().ref('buyorders').on("value", function(snapshot){
      dispatch({ type: "RECEIVE_BUY_ORDERS_DATA", payload: snapshot.val() });
    })
  },
  buyOrders: (user) => (dispatch) => {
    firebaseRef.database().ref('buyorders')
    .orderByChild('status').equalTo('Initiated')
      .on('value', function(snapshot){
        console.log(snapshot.val());
        dispatch(getBuyOrders(snapshot.val()))
      })
  }
}
