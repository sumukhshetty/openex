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
    firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid).once("value", function(snap){
      var userData = snap.val()  
      firebaseRef.database()
        .ref(url+'/'+ userData.country + '/' +orderId)
        .on("value", function(snapshot){
          dispatch(getActiveTradeData(snapshot.val(), orderId))
        })
    })
  }
}
