import {firebaseRef} from './../../index.js'

export const GET_ACTIVE_TRADES = 'GET_ACTIVE_TRADES'
function getActiveTrades(activeTradesPayload) {
  return {
    type: GET_ACTIVE_TRADES,
    payload: activeTradesPayload
  }
}


module.exports = {
  getActiveEscrows: (user) => (dispatch) => {
    firebaseRef.database()
      .ref('/users/'+user.data.uid+'/activeEscrows')
      .on("value", function(snapshot){
        dispatch(getActiveTrades(snapshot.val()))
      })
    
  }
}