import {firebaseRef} from './../../index.js'


function setDisputedTrades(disputedTradesPayload){
  return {
    type: 'SET_DISPUTED_TRADES',
    payload: disputedTradesPayload
  }
}

function clearDisptedTrades(){
  return {
    type: 'CLEAR_DISPUTED_TRADES',
    payload: null
  }
}


module.exports = {
  disputedTrades: () => (dispatch) => {
    console.log('AdminActions.disputedTrades')
    firebaseRef.database().ref('/disputes').once('value', function(snap){
      console.log(snap.val())
      dispatch(setDisputedTrades(snap.val()))
    })
  },
  clearState: () => (dispatch) =>{
    dispatch(clearDisptedTrades())
  }
}
