import {firebaseRef} from '../index.js'

export const GET_DISPUTED_TRADES = 'GET_DISPUTED_TRADES'
function getDisputes (disputedTradesPayload) {
  return {
    type: GET_DISPUTED_TRADES,
    payload: disputedTradesPayload
  }
}

module.exports = {
  getDisputedTrades: () => (dispatch) => {
    firebaseRef.database()
      .ref('/disputes')
      .on('value', snap => {
        dispatch(getDisputes(snap.val()))
      })
  }
}
