import {firebaseRef} from './../../index.js'

export const GET_TRADE_FEEDBACK = 'GET_TRADE_FEEDBACK'
function getTradeFeedback (tradeFeedbackPayload) {
  return {
    type: GET_TRADE_FEEDBACK,
    payload: tradeFeedbackPayload
  }
}

module.exports = {
  tradeFeedback: (user, purchaseRequestId) => (dispatch) => {
    // console.log("TradeFeedbackActions.tradeFeedback")
    // console.log(user)
    // console.log(purchaseRequestId)
    firebaseRef.database().ref('/traderating/' + user.uid + '/' + purchaseRequestId).once('value', function (snap) {
      // console.log("!@#")
      var tradeFeedbackRating = snap.val()
      // console.log(tradeFeedbackRating.value)
      dispatch(getTradeFeedback(tradeFeedbackRating.value))
    })
    // console.log('last line in the actions')
  },
  updateRating: (rating) => (dispatch) => {
    // console.log('updating the rating')
    // console.log(rating)
    dispatch(getTradeFeedback(rating))
  }
}
