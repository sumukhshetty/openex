import {firebaseRef} from './../../index.js'

export const GET_ACTIVE_TRADE = 'GET_ACTIVE_TRADE'
function getActiveTradeData(activeTradesPayload, id) {
  return {
    type: GET_ACTIVE_TRADE,
    // ISSUE-231-35: Change this to data in the reducer
    payload: activeTradesPayload,
    id: id
  }
}


module.exports = {
  getActiveTrade: (orderId, tradeType) => (dispatch) => {
      // ISSUE-231-31: Get rid of buyorders, there are only purchaserequests
    var url = tradeType === 'buy-ether' ? 'buyorders' : 'purchaserequests';
    // ISSUE-231-30: Pass in the user and get the country from user.profile.country
    firebaseRef.database().ref('/users/'+firebaseRef.auth().currentUser.uid).once("value", function(snap){
      var userData = snap.val()  
      firebaseRef.database()
      // ISSUE-231-32: the ref is to purchaserequests/user.profile.country/purchaserequests
        .ref(url+'/'+ userData.country + '/' +orderId)
        .on("value", function(snapshot){
          // // ISSUE-231-32: change orderId to purchaseRequestsId
          dispatch(getActiveTradeData(snapshot.val(), orderId))
        })
    })
  }
}
