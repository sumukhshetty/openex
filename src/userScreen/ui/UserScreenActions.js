import {firebaseRef} from './../../index.js'

export const GET_USER_SCREEN = 'GET_USER_SCREEN'
function getUserScreen(userScreenPayload) {
  return {
    type: GET_USER_SCREEN,
    payload: userScreenPayload
  }
}

function clearUserScreen(){
  return {
    type: 'CLEAR_USER_SCREEN',
  }
}

module.exports = {
  userScreen: (userUid, users) => (dispatch) => {
    console.log("UserScreenActions.getUserScreen")
    var user = users.data[userUid]
    var userScreenPayload = {
      username: user.username,
      lastOnline: user.lastOnline,
      numberOfTrades: user.numberOfTrades,
      verifiedEmail: user.verifiedEmail,
      verifiedPhoneNumber: user.verifiedPhoneNumber,
      avgFeedback: user.avgFeedback,
      accountCreated: user.accountCreated,
      tradeVolume: user.tradeVolume,
      firstPurchase: user.firstPurchase
    }
    dispatch(getUserScreen(userScreenPayload))
  },
  clearState: () =>(dispatch)=>{
    dispatch(clearUserScreen())
  }
}