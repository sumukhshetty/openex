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
  userScreen: (userUid, users, presence) => (dispatch) => {
    var _presence
    if(presence.data){
      _presence = presence.data[userUid]
    }
    var user = users.data[userUid]
    var _verifiedPhone
    if(user.verifiedPhoneNumber) {
      _verifiedPhone = user.verifiedPhoneNumber
    } else {
      _verifiedPhone = 'false'
    }
    var userScreenPayload = {
      username: user.username,
      lastOnline: _presence,
      numberOfTrades: user.numberOfTrades,
      verifiedEmail: user.verifiedEmail,
      verifiedPhoneNumber: _verifiedPhone,
      avgFeedback: user.avgFeedback,
      accountCreated: user.accountCreated,
      tradeVolume: user.tradeVolume,
      firstPurchase: user.firstPurchase,
      numberOfTradePartners: (user.tradingPartners) ? Object.keys(user.tradingPartners).length : 0
    }
    dispatch(getUserScreen(userScreenPayload))
  },
  clearState: () =>(dispatch)=>{
    dispatch(clearUserScreen())
  }
}