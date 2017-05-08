import {firebaseRef} from './../../index.js'

export const GET_SELL_ORDERS = 'GET_SELL_ORDERS'
function getSellOrders(sellOrdersPayload) {
  return {
    type: GET_SELL_ORDERS,
    payload: sellOrdersPayload
  }
}

export const GET_USERS_INFO = 'GET_USERS_INFO'
function getUsersInfo(userPayload, uid) {
  return {
    type: GET_USERS_INFO,
    payload: userPayload,
    id: uid
  }
}

module.exports = {
  startListeningToSellOrders: () => (dispatch, getState) =>{
    firebaseRef.database().ref('sellorders').on("value", function(snapshot){
      dispatch({ type: "RECEIVE_SELL_ORDERS_DATA", payload: snapshot.val() });
    })
  },
  sellOrders: (user) => (dispatch) => {
    console.log("sellOrders")
    console.log(user.data.uid)
    firebaseRef.database().ref('users/'+user.data.uid).once('value', function(snap){
      var userData = snap.val()
      console.log(userData)
      try{
        firebaseRef.database().ref('sellorders/'+userData.country)
        .orderByChild('availableBalance')//.startAt(0.0001)
          .on('value', function(snapshot){
            console.log(snapshot.val());
            dispatch(getSellOrders(snapshot.val()))
            Object.entries(snapshot.val()).forEach(
              ([key, value]) => {
                firebaseRef.database().ref('users/' + value['sellerUid'])
                .once('value', function(snapshot) {
                  dispatch(getUsersInfo(snapshot.val(), snapshot.key))
                });
              });
          })

      } catch(e) {
        console.log("[SellOrderActions.sellOrders]", e)
      }
    })
  }
}
