import {firebaseRef} from './../../index.js'

export const GET_TRADE_FEEDBACK = 'GET_TRADE_FEEDBACK'
function getTradeFeedback (tradeFeedbackPayload) {
  return {
    type: GET_TRADE_FEEDBACK,
    payload: tradeFeedbackPayload
  }
}

function clearTradeFeedback (){
  return {
    type: 'CLEAR_TRADE_FEEDBACK'
  }
}

module.exports = {
  tradeFeedback: (activetrade, purchaseRequestId, viewerRole) => (dispatch) => {
    var uid
    if (viewerRole === 'buyer') {
      uid = activetrade.sellerUid
    }
    if (viewerRole === 'seller') {
      uid = activetrade.buyerUid
    }
    firebaseRef.database().ref('/traderating/' + uid + '/' + purchaseRequestId).on('value', function (snap) {
      var tradeFeedbackRating = snap.val()
      if(tradeFeedbackRating){
        dispatch(getTradeFeedback(tradeFeedbackRating.rating))
      }
    })
  },
  updateRating: (rating) => (dispatch) => {
    // console.log('updating the rating')
    // console.log(rating)
    dispatch(getTradeFeedback(rating))
  },
  clearState: () => (dispatch) => {
    dispatch(clearTradeFeedback())
  }

}
