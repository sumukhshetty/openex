import {firebaseRef} from './../../index.js'

export const GET_BUY_ORDERS = 'GET_BUY_ORDERS'
function getBuyOrders(buyOrdersPayload) {
  return {
    type: GET_BUY_ORDERS,
    payload: buyOrdersPayload
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
  startListeningToBuyOrders: () => (dispatch, getState) =>{
    console.log("buyordersactions.startListeningToBuyOrders")
    firebaseRef.database().ref('/buyorders').on("value", function(snapshot){
      dispatch({ type: "RECEIVE_BUY_ORDERS_DATA", payload: snapshot.val() });
    })
  },
  buyOrders: (user) => (dispatch) => {
    console.log("BuyOrdersActions.buyOrders")
    firebaseRef.database().ref('users/'+user.data.uid).once('value', function(snap){
      var userData = snap.val()
      try{
        firebaseRef.database().ref('/buyorders/'+userData.country)
        .orderByChild('status').equalTo('Initiated')
          .on('value', function(snapshot){
            dispatch(getBuyOrders(snapshot.val()))
            Object.entries(snapshot.val()).forEach(
              ([key, value]) => {
                firebaseRef.database().ref('users/' + value['buyerUid'])
                .once('value', function(snapshot) {
                  dispatch(getUsersInfo(snapshot.val(), snapshot.key))
                });
              });
          })
      } catch(e){
        console.log("[buyordersactions.buyOrders]",e)
      }
      
    })
  }
}
